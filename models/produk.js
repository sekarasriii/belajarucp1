module.exports = (sequelize, DataTypes) => {
       const Produk = sequelize.define('Produk', {
           id: {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true,
           },
           nama_produk: {
               type: DataTypes.STRING,
               allowNull: false,
           },
           harga: {
               type: DataTypes.INTEGER,
           },
           stok: {
               type: DataTypes.INTEGER,
           },
           deskripsi: {
               type: DataTypes.TEXT,
           }
       }, {
        tableName : "Komik",
        freezeTableName : true,
        timestamps : true //fungsi true
    });
       return Produk;
   };