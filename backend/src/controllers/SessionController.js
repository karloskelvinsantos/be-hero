const connection = require('../database/connection');

module.exports = {
  async login(request, response) {
    const { id }= request.body;
    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return response.status(401).json({
        error: "This Ong not found!"
      });
    }

    return response.json(ong);
  }
}