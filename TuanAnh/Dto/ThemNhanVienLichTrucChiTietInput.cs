using System;
using System.Collections.Generic;
using System.Text;

namespace NAWASCO.ERP.DevApi.TuanAnh.Dto
{
    public class ThemNhanVienLichTrucChiTietInput
    {
        public int MaLichTrucThiCong { get; set; }
       public List<ThemNhanVienLichTrucChiTiet> NhanViens { get; set; }
    }
    public class ThemNhanVienLichTrucChiTiet
    {
        public string MaNhanVien { get; set; }
        public string ChucVu { get; set; }
    }
}   
