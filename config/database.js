import { Sequelize } from "sequelize";

const database = new Sequelize("hewanpedia", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const databaseAuthenticate = async () => {
  try {
    await database.authenticate();
    console.log("berhasil koneksi ke database");
  } catch (error) {
    console.error("gagal pada saat koneksi ke database", error);
  }
};

databaseAuthenticate();
export default database;
