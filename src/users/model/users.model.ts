// atributos que um usuário terá
import { Document } from 'mongoose';
export interface User extends Document {
  name: string
  email: string
  password: string
}