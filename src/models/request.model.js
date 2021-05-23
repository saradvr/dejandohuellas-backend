const { model, Schema } = require('mongoose');

const requestSchema = new Schema({
  animal: {
    type: Schema.Types.ObjectId,
    ref: 'Animal',
    required: true,
  },
  ong: {
    type: Schema.Types.ObjectId,
    ref: 'Ong',
    required: true,
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Request = model('Request', requestSchema);

module.exports = Request;
