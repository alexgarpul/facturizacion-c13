const { request, response } = require("express");
const { isObjectId } = require("../helpers/validate-object-id");
const { Factura, User } = require("../models");
const producto = require("../models/producto");

// Consultar y agregar populate
const getFacturas = async (req = request, res = response) => {
  try {
    const query = { status: true };

    const [facturas, total] = await Promise.all([
      Factura.find(query).populate("user").populate("producto"),
      Factura.countDocuments(query),
    ]);

    res.json({
      total,
      facturas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const crearFactura = async (req = request, res = response) => {
  try {
    const { user:userId, productos:productosIds} = req.body;

    if(!isObjectId(userId)){
      return res.status(400).json({
        msg: 'Debe pasar un id de mongo valida'
      })
    }

    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({
        msg: `No existe un usuario con el id ${userId}`
      })
    }

    productosIds.map((producto)=>{
      if(!producto){
        return res.status(400).json({
          msg: `Debe pasar un id de mongo valido - Producto`,
          index,
        })
      }
    })

    // const factura = new Factura(req.body);
    // await factura.save();

    res.status(201).json({
      // factura,
      user,
      productosIds,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  getFacturas,
  crearFactura,
};
