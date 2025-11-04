const express = require('express');
    const app = express();
    const PORT = 3000;
    const db = require('./models');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Sync database & start server
    db.sequelize.sync()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server berjalan di port ${PORT}`);
            });
        })
        .catch((err) => {
            console.log(err);
        });

    // CREATE - Tambah produk baru
    app.post("/produk", async(req, res) => {
        const data = req.body;
        try {
            const produk = await db.Produk.create(data);
            res.send(produk);
        } catch(err) {
            res.status(500).send(err);
        }
    });

    // READ - Ambil semua produk
    app.get("/produk", async(req, res) => {
        try {
            const produk = await db.Produk.findAll();
            res.send(produk);
        } catch(err) {
            res.status(500).send(err);
        }
    });

    // UPDATE - Update produk by ID
    app.put("/produk/:id", async(req, res) => {
        const id = req.params.id;
        const data = req.body;

        try {
            const produk = await db.Produk.findByPk(id);
            if (!produk) {
                return res.status(404).send({message: "Produk tidak ditemukan"});
            }
            await produk.update(data);
            res.send({message: "Produk berhasil diupdate", produk});
        } catch(err) {
            res.status(500).send(err);
        }
    });

    // DELETE - Hapus produk by ID
    app.delete("/produk/:id", async(req, res) => {
        const id = req.params.id;

        try {
            const produk = await db.Produk.findByPk(id);
            if (!produk) {
                return res.status(404).send({message: "Produk tidak ditemukan"});
            }
            await produk.destroy();
            res.send({message: "Produk berhasil dihapus"});
        } catch(err) {
            res.status(500).send(err);
        }
    });