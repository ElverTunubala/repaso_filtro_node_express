import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import { Product } from './product';
import bcrypt from 'bcrypt';

@Table({tableName: "users",
  timestamps: true, // Si deseas que Sequelize maneje los timestamps automáticamente
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({type: DataType.INTEGER})
  id!: number;

  @Column({type: DataType.STRING, allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name is required"
      },
      len: {
        args: [3, 50],
        msg: "Name must be between 3 and 50 characters long"
      }
    }
  })
  name!: string;

  @Column({type: DataType.STRING, allowNull: false, unique: true,
    validate: { isEmail: { msg: "Invalid email address"}}
  })
  email!: string;

  @Column({type: DataType.STRING, allowNull: false,
    validate: {
      len: {
        args: [5, 100],
        msg: "Password must be between 5 and 100 characters long"
      }
    }
  })
  password!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false,
    validate: {
      notNull: {
        msg: "Estate is required"
      }
    }
   })
  estate!: boolean;
  
  @HasMany(() => Product)
  products!: Product[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
}
