const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [id] = await connection('incidents').count('*');

    response.set('X-Total-Count', id['count(*)']);

    const incidents = await connection('incidents')
      .join('ongs', 'incidents.ong_id', '=', 'ongs.id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    return response.json(incidents);
  },

  async create(request, response) {
    const ong_id = request.headers.authorization;
    const { title, description, value } = request.body;

    const ong = await connection('ongs')
      .where('id', ong_id).select()
      .first();

    if (!ong) {
      return response.status(404).json({
        message: 'Ong não encontrada',
      });
    }

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id: ong.id
    });

    return response.json(id);
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({
        message: 'Operation not permitted',
      });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}