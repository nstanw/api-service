using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NAWASCO.ERP.TuanAnhAppServices.Dto.CreateViTriThiCongVatTuInput
{
    public class CreateViTriThiCongVatTuInput
    {
        // Phường Hưng Dũng
        [StringLength(10)]
        public string MAPHUONG { get; set; }
        // KHối 3
        [StringLength(10)]
        public string MAKHOI { get; set; }
        // ĐƯờng mai Lão Bạng
        [StringLength(4)]
        public string MADPLD { get; set; }
        [StringLength(10)]
        public string MaDiaDiemCongTy { get; set; }
        // Số nhà 55, 
        [StringLength(100)]
        public string TenDiaDiem { get; set; }

        public bool KhuVucCongTy { get; set; }
        public string Code { get; set; }
    }
}
