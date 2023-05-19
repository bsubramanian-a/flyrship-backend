import { Model, Column, Table, Unique, AutoIncrement, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING, 
    unique: false,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  phone: string;
}