using System;
using System.Collections.Generic;
using System.Text;

namespace NAWASCO.ERP.DevApi.TuanAnh.Dto
{

    public class UpdateHoaChatSXNInput
    {
        public DateTime Ngay { get; set; }
        public int Ca { get; set; }
        public double? HV_Voi { get; set; }
        public double? HV_Clo { get; set; }
        public double? HV_PAC { get; set; }
        public double? CB_Voi { get; set; }
        public double? CB_Clo { get; set; }
        public double? CB_PAC { get; set; }
        public double? HN_Voi { get; set; }
        public double? HN_Clo { get; set; }
        public double? HN_PAC { get; set; }
    }
}
