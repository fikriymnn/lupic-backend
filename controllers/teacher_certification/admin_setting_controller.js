// ============================================
// CONTROLLER: adminSettingController.js
// ============================================

const AdminSetting = require("../../model/teacher_certification/admin_setting/admin_setting_model");

const AdminSettingController = {
// Get Admin Setting
getAdminSetting : async (req, res) => {
  try {
    let setting = await AdminSetting.findOne();
    
    // Jika belum ada setting, buat default
    if (!setting) {
      setting = await AdminSetting.create({
        jenis_pembayaran: ["Transfer Bank", "E-Wallet", "COD"],
        no_whatsapp: "081234567890"
      });
    }
    
    res.status(200).json({
      success: true,
      data: setting
    });
  } catch (error) {
   console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data setting",
      error: error.message
    });
  }
}

// Update Nomor WhatsApp
,updateWhatsApp : async (req, res) => {
  try {
    const { no_whatsapp } = req.body;
    
    if (!no_whatsapp) {
      return res.status(400).json({
        success: false,
        message: "Nomor WhatsApp harus diisi"
      });
    }
    
    let setting = await AdminSetting.findOne();
    
    if (!setting) {
      setting = await AdminSetting.create({
        no_whatsapp,
        jenis_pembayaran: []
      });
    } else {
      setting.no_whatsapp = no_whatsapp;
      await setting.save();
    }
    
    res.status(200).json({
      success: true,
      message: "Nomor WhatsApp berhasil diupdate",
      data: setting
    });
  } catch (error) {
   console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Gagal mengupdate nomor WhatsApp",
      error: error.message
    });
  }
}

// Tambah Jenis Pembayaran
,addJenisPembayaran : async (req, res) => {
  try {
    const { jenis_pembayaran } = req.body;
    
    if (!jenis_pembayaran) {
      return res.status(400).json({
        success: false,
        message: "Jenis pembayaran harus diisi"
      });
    }
    
    let setting = await AdminSetting.findOne();
    
    if (!setting) {
      setting = await AdminSetting.create({
        jenis_pembayaran: [jenis_pembayaran],
        no_whatsapp: ""
      });
    } else {
      // Cek duplikat
      if (setting.jenis_pembayaran.includes(jenis_pembayaran)) {
        return res.status(400).json({
          success: false,
          message: "Jenis pembayaran sudah ada"
        });
      }
      
      setting.jenis_pembayaran.push(jenis_pembayaran);
      await setting.save();
    }
    
    res.status(201).json({
      success: true,
      message: "Jenis pembayaran berhasil ditambahkan",
      data: setting
    });
  } catch (error) {
   console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan jenis pembayaran",
      error: error.message
    });
  }
}

// Update Jenis Pembayaran
,updateJenisPembayaran : async (req, res) => {
  try {
    const { index } = req.params;
    const { jenis_pembayaran } = req.body;
    
    if (!jenis_pembayaran) {
      return res.status(400).json({
        success: false,
        message: "Jenis pembayaran harus diisi"
      });
    }
    
    const setting = await AdminSetting.findOne();
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting tidak ditemukan"
      });
    }
    
    if (index < 0 || index >= setting.jenis_pembayaran.length) {
      return res.status(400).json({
        success: false,
        message: "Index tidak valid"
      });
    }
    
    // Cek duplikat (kecuali index yang sama)
    const isDuplicate = setting.jenis_pembayaran.some((item, i) => 
      item === jenis_pembayaran && i !== parseInt(index)
    );
    
    if (isDuplicate) {
      return res.status(400).json({
        success: false,
        message: "Jenis pembayaran sudah ada"
      });
    }
    
    setting.jenis_pembayaran[index] = jenis_pembayaran;
    await setting.save();
    
    res.status(200).json({
      success: true,
      message: "Jenis pembayaran berhasil diupdate",
      data: setting
    });
  } catch (error) {
   console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Gagal mengupdate jenis pembayaran",
      error: error.message
    });
  }
}

// Hapus Jenis Pembayaran
,deleteJenisPembayaran : async (req, res) => {
  try {
    const { index } = req.params;
    
    const setting = await AdminSetting.findOne();
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting tidak ditemukan"
      });
    }
    
    if (index < 0 || index >= setting.jenis_pembayaran.length) {
      return res.status(400).json({
        success: false,
        message: "Index tidak valid"
      });
    }
    
    setting.jenis_pembayaran.splice(index, 1);
    await setting.save();
    
    res.status(200).json({
      success: true,
      message: "Jenis pembayaran berhasil dihapus",
      data: setting
    });
  } catch (error) {
   console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Gagal menghapus jenis pembayaran",
      error: error.message
    });
  }
}
}
module.exports = AdminSettingController