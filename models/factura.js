const { DateTime } = require("luxon");
const { Schema, model } = require("mongoose");
const user = require("./user");

const FacturaSchema = Schema({
  productos: {
    type: [Schema.Types.ObjectId],
    ref: "Producto",
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

FacturaSchema.methods.toJSON = function () {
  const { __v, _id, createdAt, ...factura } = this.toObject();
  factura.id = _id;

  factura.createdAt = DateTime.fromISO(createdAt.toISOString());

  const { __v: u__v, _id: u_id, password, ...user } = factura.user;
  user.id = u_id;
  factura.user = user;

  factura.productos = factura.productos.map((elem) => {
    const { __v: p__v, _id: p_id, img, ...producto } = elem;
    producto.id = p_id;
    return producto;
  });

  return factura;
};

module.exports = model("Factura", FacturaSchema);
