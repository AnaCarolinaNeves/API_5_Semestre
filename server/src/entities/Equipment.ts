import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

// enum EquipmentType {
//     PosteDeMadeira = 1,
//     Transformador = 2,
//     Chave = 3
// }

@Entity()
export class Equipment {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    type: string;

    @Column({ type: "varchar", length: 30 })
    serial: string;

    @Column({ type: "double precision" })
    latitude: number;

    @Column({ type: "double precision" })
    longitude: number;

    @Column({ type: "varchar", length: 200 })
    observations: string;

    @Column()
    url: string[];

    @Column()
    status: boolean;
}
