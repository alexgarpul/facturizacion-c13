const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'El nombre es obligatorio'],
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
    required: [true, 'Si está disponible o no, es obligatorio'],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, 'El precio es obligatorio'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: true,
  },
})

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, status, createdAt, modifiedAt, ...producto } =
    this.toObject()
  producto.id = _id

  producto.createdAt = DateTime.fromISO(createdAt.toISOString())
  producto.modifiedAt = DateTime.fromJSDate(modifiedAt, {
    zone: 'America/Bogota',
  })
  return producto
}

module.exports = model('Producto', ProductoSchema)
