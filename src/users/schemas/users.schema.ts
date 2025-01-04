import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
})

UsersSchema.pre('save', async function(next: Function) {
  try {
    if (!this.isModified('password')) { // se a senha não foi modificada
      return next(); // retorna o middleware
    }

    this['password'] = await bcrypt.hash(this['password'], 10); // se a senha foi modificada, criptografe a senha
  } catch (err) { 
    return next(err);
  }
});