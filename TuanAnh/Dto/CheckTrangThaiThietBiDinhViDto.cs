using System;
using System.Collections.Generic;
using System.Text;

namespace NAWASCO.ERP.DevApi.TuanAnh.Dto
{
    public class CheckTrangThaiThietBiDinhViDto
    {
        public int XeMayDeviceID { get; set; }
        public string DeviceId { get; set; }
        public string TenXeMay { get; set; }
        public string BienKiemSoat { get; set; }
        public DateTime? ThoiGianTruyenDuLieuGPS { get; set; }
        public DateTime? ThoiGianTruyenDuLieuStatus { get; set; }
    }
}
