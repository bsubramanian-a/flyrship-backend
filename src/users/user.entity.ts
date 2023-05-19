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

  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
  })
  is_email_public: boolean;

  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
  })
  is_phone_public: boolean;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  facebook: string;
  
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  twitter: string;
  
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  instagram: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  linkedin: string;

  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
  })
  is_social_public: boolean;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
  })
  zip: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  country: string;

  @Column({
    type: DataType.TEXT,
    unique: false,
    allowNull: true,
  }) 
  about_me: string;
}