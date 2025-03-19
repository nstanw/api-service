using Abp.Application.Services;
using Abp.Authorization;
using Abp.BackgroundJobs;
using Abp.Domain.Repositories;
using Abp.UI;
using NAWASCO.ERP.Core.Models.QuanLyCongViecs.KhaiBaoNgayNghis;
using NAWASCO.ERP.Core.Models.QuanLyCongViecs.KhaiBaoRaNgoais;
using NAWASCO.ERP.Core.Models.QuanLyCongViecs.NgayLamViecs;
using NAWASCO.ERP.DevApi.TuanAnh.Dto;
using NAWASCO.ERP.Manager.QuanLyCongViecTo2KTs;
using NAWASCO.ERP.Models.CallCenters;
using NAWASCO.ERP.Models.CongTrinhs.Bieu10s;
using NAWASCO.ERP.Models.CongTrinhs.GiaoKhoans;
using NAWASCO.ERP.Models.CongTrinhs.NghiemThus;
using NAWASCO.ERP.Models.DanhMucs.NhomNhanViens;
using NAWASCO.ERP.Models.EOSNA;
using NAWASCO.ERP.Models.EOSNAExtend.ChamCongs;
using NAWASCO.ERP.Models.EOSNAExtend.NhanViens;
using NAWASCO.ERP.Models.HoaDons;
using NAWASCO.ERP.Models.PhieuYeuCaus;
using NAWASCO.ERP.Models.PhieuYeuCaus.Jobs;
using NAWASCO.ERP.Models.QuanLyCongViecs.LichTrucThiCongs;
using NAWASCO.ERP.Models.QuanLyCongViecTo2s;
using NAWASCO.ERP.Models.SanXuatNuocs.CaTrucs;
using NAWASCO.ERP.Models.SanXuatNuocs.HoaChats;
using NAWASCO.ERP.Models.SanXuatNuocs.LichTrucChiTiets;
using NAWASCO.ERP.Models.SanXuatNuocs.NhanVienCongViecs;
using NAWASCO.ERP.Models.SuaChuaSuCos;
using NAWASCO.ERP.Models.ThiCongTuyenOngs;
using NAWASCO.ERP.Models.VatTus.CongCuDungCus;
using NAWASCO.ERP.Models.VatTus.PhieuXuats;
using NAWASCO.ERP.Models.VatTus.VatTus;
using NAWASCO.ERP.Models.XeMays;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static NAWASCO.ERP.ERPConsts;

namespace NAWASCO.ERP.TuanAnhAppServices
{
    [AbpAuthorize]
    public class TuanAnhAppServices : ERPAppServiceBase, IApplicationService
    {
        private readonly IRepository<GiaoKhoanNghiemThuVatTu, int> _giaoKhoanNghiemThuVatTuRepository;
        private readonly IRepository<GiaoKhoanNghiemThuCT, int> _giaoKhoanNghiemThuCTRepository;
        private readonly IRepository<ViewGiaoKhoanNghiemThuVatTu, int> _viewGiaoKhoanNghiemThuVatTuRepository;
        private readonly IRepository<PhieuXuatKhoVatTu, long> _phieuXuatKhoVatTuRepository;
        private readonly IRepository<ViewPhieuXuatKhoVatTu, long> _viewPhieuXuatKhoVatTuRepository;
        private readonly IRepository<ViTriThiCong, int> _viTriThiCongRepository;
        private readonly IRepository<TuyenOngBaoCao, int> _tuyenOngBaoCaoRepository;
        private readonly IRepository<ViewXeMayDevice> _viewXeMayDeviceRepository;
        private readonly IRepository<KhaiBaoNgayNghi, long> _khaiBaoNgayNghiRepository;
        private readonly IRepository<NgayLamViec, string> _ngayLamViecRepository;
        private readonly IRepository<GiaoKhoanVatTu, int> _giaoKhoanVatTuRepository;
        private readonly IRepository<GiaoKhoan, int> _giaoKhoanRepository;
        private readonly IRepository<GiaoKhoanHistory, int> _giaoKhoanHistoryRepository;
        private readonly IRepository<ViewVatTuHangHoa, int> _viewVatTuHangHoaRepository;
        private readonly IRepository<VatTuHangHoaSuSungThuongXuyen, string> _vatTuHangHoaSuSungThuongXuyenRepository;
        private readonly IRepository<SXN_LichTrucChiTiets, long> _lichTrucChiTietRepository;
        private readonly IRepository<SXN_CaTruc, long> _SXN_CaTrucRepository;
        private readonly IRepository<DONDANGKY, string> _donDangKyRepository;
        private readonly IRepository<ViewDonDangKyOfGoiDienTNTT, string> _viewDonDangKyOfGoiDienTNTTRepository;
        private readonly IRepository<LichSuDienThoai> _lichSuDienThoaiRepository;
        private readonly IRepository<SXN_HoaChat, string> _hoaChatRepository;
        private readonly IRepository<ViewNhanVien, long> _viewNhanVienRepository;
        private readonly IRepository<LichTrucThiCong> _lichTrucThiCongRepository;
        private readonly IRepository<LichTrucThiCongCT> _lichTrucThiCongCTRepository;
        private readonly IRepository<SuaChuaSuCo, string> _suaChuaSuCoRepository;
        private readonly IRepository<NHANVIEN, string> _nhanVienRepository;
        private readonly IRepository<ThucHienCongViecTo2KT> _thucHienCongViecTo2KTRepository;
        private readonly IRepository<ThucHienCongViecTo2KTCT> _thucHienCongViecTo2KTCTRepository;
        private readonly ThucHienCongViecTo2KTManager _thucHienCongViecTo2KTManager;
        private readonly IRepository<ViewThucHienCongViecTo2KT> _viewThucHienCongViecTo2KTRepository;
        private readonly IRepository<NhanVienChucVu> _nhanVienChucVuRepository;
        private readonly IRepository<KhaiBaoRaNgoai, long> _khaiBaoRaNgoaiRepository;
        private readonly IRepository<SXN_NhanVienCongViecs, long> _nhanVienCongViecSXNRepository;
        private readonly IRepository<NHANVIENCONGVIEC, string> _NHANVIENCONGVIECRepository;
        private readonly IRepository<GiaoKhoanNghiemThu, int> _giaoKhoanNghiemThuRepository;
        private readonly IRepository<GiaoKhoanNghiemThuResources, int> _giaoKhoanNghiemThuResourcesRepository;
        private readonly IRepository<LenhDieuXeMay> _lenhDieuXeMayRepository;
        private readonly PhieuYeuCauManager _phieuYeuCauManager;
        private readonly IBackgroundJobManager _backgroundJobManager;
        private readonly IRepository<HoaDonDienTu, Guid> _hoaDonDienTuRepository;
        private readonly IRepository<TIEUTHUCT, int> _TIEUTHUCTRepository;
        private readonly IRepository<CongCuDungCu, int> _congCuDungCuRepository;
        private readonly IRepository<VatTuHangHoa, int> _vatTuHangHoaRepository;
        private readonly IRepository<KiemKeCongCuDungCu, int> _kiemKeCongCuDungCuRepository;
        private readonly IRepository<PhieuXuatKhoVatTuGiaoKhoanVatTuCT, long> _phieuXuatKhoVatTuGiaoKhoanVatTuCTRepository;
        private readonly IRepository<DanhMucThietBi, int> _danhMucThietBiRepository;
        private readonly IRepository<ChamCongCongTrinh, int> _chamCongCongTrinhRepository;
        public TuanAnhAppServices(
            IRepository<GiaoKhoanNghiemThuVatTu, int> giaoKhoanNghiemThuVatTuRepository,
            IRepository<ViewGiaoKhoanNghiemThuVatTu, int> viewGiaoKhoanNghiemThuVatTuRepository,
            IRepository<PhieuXuatKhoVatTu, long> phieuXuatKhoVatTuRepository,
            IRepository<ViewPhieuXuatKhoVatTu, long> viewPhieuXuatKhoVatTuRepository,
            IRepository<ViTriThiCong, int> viTriThiCongRepository,
            IRepository<TuyenOngBaoCao, int> tuyenOngBaoCaoRepository,
            IRepository<ViewViTriThiCong, int> viewViTriThiCongRepository,
            IRepository<ViewXeMayDevice> viewXeMayDeviceRepository,
            IRepository<KhaiBaoNgayNghi, long> khaiBaoNgayNghiRepository,
            IRepository<NgayLamViec, string> ngayLamViecRepository,
            IRepository<GiaoKhoanVatTu, int> giaoKhoanVatTuRepository,
            IRepository<GiaoKhoan, int> giaoKhoanRepository,
            IRepository<GiaoKhoanHistory, int> giaoKhoanHistoryRepository,
            IRepository<ViewVatTuHangHoa, int> viewVatTuHangHoaRepository,
            IRepository<VatTuHangHoaSuSungThuongXuyen, string> vatTuHangHoaSuSungThuongXuyenRepository,
            IRepository<SXN_LichTrucChiTiets, long> lichTrucChiTietRepository,
            IRepository<SXN_CaTruc, long> SXN_CaTrucRepository,
            IRepository<DONDANGKY, string> donDangKyRepository,
            IRepository<ViewDonDangKyOfGoiDienTNTT, string> viewDonDangKyOfGoiDienTNTTRepository,
            IRepository<LichSuDienThoai> lichSuDienThoaiRepository,
            IRepository<SXN_HoaChat, string> hoaChatRepository,
            IRepository<ViewNhanVien, long> viewNhanVienRepository,
            IRepository<LichTrucThiCong> lichTrucThiCongRepository,
            IRepository<LichTrucThiCongCT> lichTrucThiCongCTRepository,
            IRepository<SuaChuaSuCo, string> suaChuaSuCoRepository,
            IRepository<NHANVIEN, string> nhanVienRepository,
            IRepository<GiaoKhoanNghiemThuCT, int> giaoKhoanNghiemThuCTRepository,
            IRepository<ThucHienCongViecTo2KT> thucHienCongViecTo2KTRepository,
            IRepository<ThucHienCongViecTo2KTCT> thucHienCongViecTo2KTCTRepository,
            ThucHienCongViecTo2KTManager thucHienCongViecTo2KTManager,
            IRepository<ViewThucHienCongViecTo2KT> viewThucHienCongViecTo2KTRepository,
            IRepository<NhanVienChucVu> nhanVienChucVuRepository,
            IRepository<KhaiBaoRaNgoai, long> khaiBaoRaNgoaiRepository,
            IRepository<SXN_NhanVienCongViecs, long> nhanVienCongViecSXNRepository,
            IRepository<NHANVIENCONGVIEC, string> NHANVIENCONGVIECRepository,
            IRepository<GiaoKhoanNghiemThu, int> giaoKhoanNghiemThuRepository,
            IRepository<GiaoKhoanNghiemThuResources, int> giaoKhoanNghiemThuResourcesRepository,
            IRepository<LenhDieuXeMay> lenhDieuXeMayRepository,
            PhieuYeuCauManager phieuYeuCauManager,
            IBackgroundJobManager backgroundJobManager,
            IRepository<HoaDonDienTu, Guid> hoaDonDienTuRepository,
            IRepository<TIEUTHUCT, int> TIEUTHUCTRepository,
            IRepository<CongCuDungCu, int> congCuDungCuRepository,
            IRepository<VatTuHangHoa, int> vatTuHangHoaRepository,
            IRepository<KiemKeCongCuDungCu, int> kiemKeCongCuDungCuRepository,
            IRepository<PhieuXuatKhoVatTuGiaoKhoanVatTuCT, long> phieuXuatKhoVatTuGiaoKhoanVatTuCTRepository,
            IRepository<DanhMucThietBi, int> danhMucThietBiRepository,
            IRepository<ChamCongCongTrinh, int> chamCongCongTrinhRepository

            )
        {
            _giaoKhoanNghiemThuVatTuRepository = giaoKhoanNghiemThuVatTuRepository;
            _viewGiaoKhoanNghiemThuVatTuRepository = viewGiaoKhoanNghiemThuVatTuRepository;
            _phieuXuatKhoVatTuRepository = phieuXuatKhoVatTuRepository;
            _viewPhieuXuatKhoVatTuRepository = viewPhieuXuatKhoVatTuRepository;
            _viTriThiCongRepository = viTriThiCongRepository;
            _tuyenOngBaoCaoRepository = tuyenOngBaoCaoRepository;
            _viewXeMayDeviceRepository = viewXeMayDeviceRepository;
            _khaiBaoNgayNghiRepository = khaiBaoNgayNghiRepository;
            _ngayLamViecRepository = ngayLamViecRepository;
            _giaoKhoanVatTuRepository = giaoKhoanVatTuRepository;
            _giaoKhoanRepository = giaoKhoanRepository;
            _giaoKhoanHistoryRepository = giaoKhoanHistoryRepository;
            _viewVatTuHangHoaRepository = viewVatTuHangHoaRepository;
            _vatTuHangHoaSuSungThuongXuyenRepository = vatTuHangHoaSuSungThuongXuyenRepository;
            _lichTrucChiTietRepository = lichTrucChiTietRepository;
            _SXN_CaTrucRepository = SXN_CaTrucRepository;
            _donDangKyRepository = donDangKyRepository;
            _viewDonDangKyOfGoiDienTNTTRepository = viewDonDangKyOfGoiDienTNTTRepository;
            _lichSuDienThoaiRepository = lichSuDienThoaiRepository;
            _hoaChatRepository = hoaChatRepository;
            _viewNhanVienRepository = viewNhanVienRepository;
            _lichTrucThiCongRepository = lichTrucThiCongRepository;
            _lichTrucThiCongCTRepository = lichTrucThiCongCTRepository;
            _suaChuaSuCoRepository = suaChuaSuCoRepository;
            _nhanVienRepository = nhanVienRepository;
            _giaoKhoanNghiemThuCTRepository = giaoKhoanNghiemThuCTRepository;
            _thucHienCongViecTo2KTRepository = thucHienCongViecTo2KTRepository;
            _thucHienCongViecTo2KTCTRepository = thucHienCongViecTo2KTCTRepository;
            _thucHienCongViecTo2KTManager = thucHienCongViecTo2KTManager;
            _viewThucHienCongViecTo2KTRepository = viewThucHienCongViecTo2KTRepository;
            _nhanVienChucVuRepository = nhanVienChucVuRepository;
            _khaiBaoRaNgoaiRepository = khaiBaoRaNgoaiRepository;
            _nhanVienCongViecSXNRepository = nhanVienCongViecSXNRepository;
            _NHANVIENCONGVIECRepository = NHANVIENCONGVIECRepository;
            _giaoKhoanNghiemThuRepository = giaoKhoanNghiemThuRepository;
            _giaoKhoanNghiemThuResourcesRepository = giaoKhoanNghiemThuResourcesRepository;
            _lenhDieuXeMayRepository = lenhDieuXeMayRepository;
            _phieuYeuCauManager = phieuYeuCauManager;
            _backgroundJobManager = backgroundJobManager;
            _hoaDonDienTuRepository = hoaDonDienTuRepository;
            _TIEUTHUCTRepository = TIEUTHUCTRepository;
            _congCuDungCuRepository = congCuDungCuRepository;
            _vatTuHangHoaRepository = vatTuHangHoaRepository;
            _kiemKeCongCuDungCuRepository = kiemKeCongCuDungCuRepository;
            _phieuXuatKhoVatTuGiaoKhoanVatTuCTRepository = phieuXuatKhoVatTuGiaoKhoanVatTuCTRepository;
            _danhMucThietBiRepository = danhMucThietBiRepository;
            _chamCongCongTrinhRepository = chamCongCongTrinhRepository;
        }

        #region Quản lý nhân viên
        public bool SuaThoiGianDiemDanhKyThuat7AM(string maNhanVien, int MaThucHienCongViecTo2KT)
        {
            var nhanvien = _viewNhanVienRepository.FirstOrDefault(d => d.MaNhanVien == maNhanVien) ?? throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            var thucHienCongViecTo2KT = _thucHienCongViecTo2KTRepository.FirstOrDefault(d => d.MaThucHienCongViecTo2KT == MaThucHienCongViecTo2KT && d.MaNhanVien == nhanvien.UserID)
                                         ?? throw new UserFriendlyException("Không tìm thấy thông tin thực hiện công việc");
            thucHienCongViecTo2KT.ThoiGianBatDau = DateTime.Today.AddHours(7);
            thucHienCongViecTo2KT.ThoiGianDuKienBatDau = DateTime.Today.AddHours(7);
            _thucHienCongViecTo2KTRepository.Update(thucHienCongViecTo2KT);
            var thucHienCongViecTo2KTCT = _thucHienCongViecTo2KTCTRepository.FirstOrDefault(d => d.MaThucHienCongViecTo2KT == MaThucHienCongViecTo2KT && d.CreatorUserId == nhanvien.UserID && d.TrangThai == "TT_P")
                             ?? throw new UserFriendlyException("Không tìm thấy thông tin thực hiện công việc");
            thucHienCongViecTo2KTCT.ThoiGianBatDau = DateTime.Today.AddHours(7);
            _thucHienCongViecTo2KTCTRepository.Update(thucHienCongViecTo2KTCT);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        public object XemNhanVienUserId(long userId)
        {
            var nhanVien = _viewNhanVienRepository.FirstOrDefault(d => d.UserID == userId);
            return nhanVien;
        }
        public object ChuyenPhongBanNhanVien(string maNhanVien, string maPB, string viTriLamViec)
        {
            var nhanVien = _nhanVienRepository.FirstOrDefault(d => d.MANV == maNhanVien) ?? throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            nhanVien.MAPB = maPB;
            nhanVien.ViTriLamViec = viTriLamViec.Trim().ToUpper();
            _nhanVienRepository.Update(nhanVien);
            CurrentUnitOfWork.SaveChanges();
            return new
            {
                nhanVien.MANV,
                nhanVien.MAPB,
                nhanVien.ViTriLamViec
            };
        }
        public async Task<bool> DeleteLichTrucThiCongCT(string maNhanVien, int maLichTrucThiCongCT)
        {
            var nhanvien = _viewNhanVienRepository.FirstOrDefault(d => d.MaNhanVien == maNhanVien);
            var lichTrucThiCongCT = await _lichTrucThiCongCTRepository.FirstOrDefaultAsync(d => d.MaNhanVien == nhanvien.UserID && d.MaLichTrucThiCongCT == maLichTrucThiCongCT);
            if (lichTrucThiCongCT == null)
            {
                throw new UserFriendlyException("Không tìm thấy thông tin lịch trực thi công chi tiết");
            }

            lichTrucThiCongCT.IsDeleted = true;
            lichTrucThiCongCT.DeletionTime = DateTime.Now;
            await _lichTrucThiCongCTRepository.UpdateAsync(lichTrucThiCongCT);
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteNhanVienChucVu(string maNhanVien)
        {
            var nhanVienChucVus = _nhanVienChucVuRepository.GetAll().Where(d => d.MaNhanVien.Contains(maNhanVien)).ToList();
            if (!nhanVienChucVus.Any())
            {
                throw new UserFriendlyException("Không tìm thấy thông tin nhân viên chức vụ");
            }

            foreach (var nhanVienChucVu in nhanVienChucVus)
            {
                await _nhanVienChucVuRepository.DeleteAsync(nhanVienChucVu);
            }
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateNhanVienPhongBanToNull(string maNhanVien)
        {
            var nhanVien = await _nhanVienRepository.FirstOrDefaultAsync(d => d.MANV == maNhanVien);
            if (nhanVien == null)
            {
                throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            }

            nhanVien.MAPB = null;
            await _nhanVienRepository.UpdateAsync(nhanVien);
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateNhanVienKyThuatNghiViec(string maNhanVien, int? maLichTrucThiCongCT)
        {
            var tasks = new List<Task>();

            if (maLichTrucThiCongCT.HasValue)
            {
                tasks.Add(DeleteLichTrucThiCongCT(maNhanVien, maLichTrucThiCongCT.Value));
            }

            tasks.Add(DeleteNhanVienChucVu(maNhanVien));
            tasks.Add(UpdateNhanVienPhongBanToNull(maNhanVien));

            // Chạy tất cả các tác vụ đồng thời
            await Task.WhenAll(tasks);

            return true;
        }


        #endregion

        #region Giao khoán & Nghiệm thu
        public async Task<ViewGiaoKhoanNghiemThuVatTu> UpdateChuaDinhViGiaoKhoan(int soNghiemThu, int nam)
        {
            var giaoKhoanNghiemThuVatTu = await _giaoKhoanNghiemThuVatTuRepository.FirstOrDefaultAsync(d => d.SoNghiemThu == soNghiemThu && d.Nam == nam);

            if (giaoKhoanNghiemThuVatTu == null)
            {
                throw new UserFriendlyException("GiaoKhoanNghiemThuVatTuID not found.");
            }

            giaoKhoanNghiemThuVatTu.TTDV = "TT_P";
            await _giaoKhoanNghiemThuVatTuRepository.UpdateAsync(giaoKhoanNghiemThuVatTu);
            CurrentUnitOfWork.SaveChanges();
            return await _viewGiaoKhoanNghiemThuVatTuRepository.FirstOrDefaultAsync(d => d.SoNghiemThu == soNghiemThu && d.Nam == nam);
        }
        public ViewGiaoKhoanNghiemThuVatTu UpdateDinhViGiaoKhoanVatTu(int giaoKhoanNghiemThuVatTuID)
        {
            // chuyển trạng thái TTDV = "TT_P" của _giaoKhoanNghiemThuVatTuCTRepository
            var giaoKhoanNghiemThuVatTu = _giaoKhoanNghiemThuVatTuRepository.FirstOrDefault(d => d.GiaoKhoanNghiemThuVatTuID == giaoKhoanNghiemThuVatTuID);
            if (giaoKhoanNghiemThuVatTu == null)
            {
                throw new UserFriendlyException("Không tìm thấy giao khoán nghiệm thu");
            }
            if (giaoKhoanNghiemThuVatTu.TTDV != "TT_P")
            {
                throw new UserFriendlyException("Giao khoán không trong trạng thái chờ định vị");
            }
            giaoKhoanNghiemThuVatTu.TTDV = "TT_A";
            giaoKhoanNghiemThuVatTu.ThoiGianDinhVi = DateTime.Now;
            giaoKhoanNghiemThuVatTu.MaNhanVienDinhVi = AbpSession.UserId;
            _giaoKhoanNghiemThuVatTuRepository.Update(giaoKhoanNghiemThuVatTu);
            CurrentUnitOfWork.SaveChanges();
            return _viewGiaoKhoanNghiemThuVatTuRepository.FirstOrDefault(d => d.GiaoKhoanNghiemThuVatTuID == giaoKhoanNghiemThuVatTuID);
        }
        public bool ChuyenNhanVienKyThuatGiaoKhoan(string code, string maNhanVienKyThuat)
        {
            var nhanvien = _viewNhanVienRepository.FirstOrDefault(d => d.MaNhanVien == maNhanVienKyThuat) ?? throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            var giaokhoan = _giaoKhoanRepository.FirstOrDefault(d => d.Code == code) ?? throw new UserFriendlyException("Không tìm thấy thông tin giao khoán");
            giaokhoan.MaNhanVienKyThuat = nhanvien.MaNhanVien;
            _giaoKhoanRepository.Update(giaokhoan);
            CurrentUnitOfWork.SaveChanges();

            return true;
        }
        public bool ChuyenNhanVienThiCongGiaoKhoan(string code, string nhanVienThiCong)
        {
            var nhanvien = _viewNhanVienRepository.FirstOrDefault(d => d.MaNhanVien == nhanVienThiCong) ?? throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            var giaokhoan = _giaoKhoanRepository.FirstOrDefault(d => d.Code == code) ?? throw new UserFriendlyException("Không tìm thấy thông tin giao khoán");
            giaokhoan.MaNhanVienThiCong = nhanvien.MaNhanVien;
            _giaoKhoanRepository.Update(giaokhoan);
            CurrentUnitOfWork.SaveChanges();

            return true;
        }
        public bool TraLaiChuaHoanThanhBanGiaoKhoan(string? CodeGiaoKhoan , int? giaoKhoanID)
        {
            var giaokhoan = _giaoKhoanRepository.FirstOrDefault(d => d.Id == giaoKhoanID) ?? throw new UserFriendlyException("Không tìm thấy thông tin giao khoán");
            var giaokhoanghiemthu = _giaoKhoanNghiemThuRepository.FirstOrDefault(d => d.GiaoKhoanID == giaokhoan.Id && d.CongTrinhHoanThanh == true);
            if (giaokhoanghiemthu != null)
            {
                giaokhoanghiemthu.CongTrinhHoanThanh = false;
                _giaoKhoanNghiemThuRepository.Update(giaokhoanghiemthu);               
            }
            giaokhoan.TTNT = "TT_P";
            _giaoKhoanRepository.Update(giaokhoan);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public bool XoaAnhNghiemThu(Guid ResourceId)
        {
            var giaoKhoanResource = _giaoKhoanNghiemThuResourcesRepository.FirstOrDefault(d => d.ResourceId == ResourceId) ?? throw new UserFriendlyException("Không tìm thấy thông tin ảnh");
            _giaoKhoanNghiemThuResourcesRepository.Delete(giaoKhoanResource);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public bool XoaGiaoKhoanNghiemThuCT0KhoiLuong(int GiaoKhoanNghiemThuID)
        {
            var GiaoKhoanNghiemThu = _giaoKhoanNghiemThuCTRepository.GetAll().Where(d => d.GiaoKhoanNghiemThuID == GiaoKhoanNghiemThuID && d.SoLuong == 0) ?? throw new UserFriendlyException("Không tìm thấy nghiệm thu Chi tiết");
            foreach (var item in GiaoKhoanNghiemThu)
            {
                _giaoKhoanNghiemThuCTRepository.Delete(item);
            }

            return true;
        }
        public object DinhViDiemChayLoi(List<string> madons)
        {
            var result = new List<object>();
            foreach (var madon in madons)
            {
                var task = _suaChuaSuCoRepository.FirstOrDefault(d => madon.Contains(d.MADON)) ?? throw new UserFriendlyException("Không tìm thấy mã đơn");
                task.TTDV = "TT_A";
                task.ThoiGianDinhVi = DateTime.Now;
                _suaChuaSuCoRepository.Update(task);
                CurrentUnitOfWork.SaveChanges();
                result.Add(new { task.MADON, task.TTDV });
            }
            return result;
        }

        #endregion

        #region Vật tư & Kho
        public ViewPhieuXuatKhoVatTu MoInLaiPhieuXuatKhoVatTu(int soPhieuXuatKho, int nam)
        {
            var task = _phieuXuatKhoVatTuRepository.FirstOrDefault(d => d.SoPhieuXuatKho == soPhieuXuatKho && d.NAM == nam) ?? throw new UserFriendlyException("Không tìm thấy thông tin phiếu xuất kho");
            task.TTIN = "TT_P";
            _phieuXuatKhoVatTuRepository.Update(task);
            CurrentUnitOfWork.SaveChanges();
            return _viewPhieuXuatKhoVatTuRepository.FirstOrDefault(d => d.SoPhieuXuatKho == soPhieuXuatKho && d.NAM == nam);
        }
        public object GetPhieuXuatKhoVatTu(int soPhieuXuatKho, int nam)
        {
            var task = _phieuXuatKhoVatTuRepository.FirstOrDefault(d => d.SoPhieuXuatKho == soPhieuXuatKho && d.NAM == nam) ?? throw new UserFriendlyException("Không tìm thấy thông tin phiếu xuất kho");
            return _viewPhieuXuatKhoVatTuRepository.FirstOrDefault(d => d.SoPhieuXuatKho == soPhieuXuatKho && d.NAM == nam);
        }
        public bool CloneKeToanXacNhanXuatKhoCongCuDungCuMini(int MaVatTuHangHoa)
        {
            var nhanvienchucvu = _nhanVienChucVuRepository.GetAll().FirstOrDefault(d => d.MaNhanVien == "nhthang");
            if (nhanvienchucvu == null)
            {
                throw new UserFriendlyException("Nhân viên đề nghị mua chưa có chức vụ");
            }
            //Một _phieuXuatKhoVatTuCT sẽ có vật tư cùng nhà sản xuất, cùng kho, giống nhau. vì không có dạng ống  (đơn vị tính lẻ mét) nên có thể for + 1 
            var vatTuHangHoaCongCu = _vatTuHangHoaRepository.FirstOrDefault(d => d.MaVatTuHangHoa == MaVatTuHangHoa)
                  ?? throw new UserFriendlyException("Không tìm thấy thông tin vật tư" + MaVatTuHangHoa);
            //var phieuXuatKhoVatTuGiaoKhoanVatTuCT = _phieuXuatKhoVatTuGiaoKhoanVatTuCTRepository.FirstOrDefault(d => d.MaPhieuXuatKhoVatTuCT == item.Id)
            //      ?? throw new UserFriendlyException("Không tìm thấy thông tin phiếu xuất kho");
            var giaoKhoanVatTuChuaDanhMuc = _giaoKhoanVatTuRepository.FirstOrDefault(d =>
                                            d.MaVatTuHangHoa == vatTuHangHoaCongCu.MaVatTuHangHoa
                                            //         && d.GiaoKhoanID == giaoKhoanOfPhieuXuatKho.Id
                                            && d.MaDanhMucThietBiID.HasValue
                                            //        && d.IsLockUngVatTu == false
                                            //     && d.VatTuDoiTacCungCap == false
                                            //          && d.SoLuongDaUng < d.SoLuong
                                            //&& phieuXuatKhoVatTuGiaoKhoanVatTuCT.GiaoKhoanVatTuID == d.GiaoKhoanVatTuID
                                            )
                ?? throw new UserFriendlyException("Không tìm thấy thông tin giao khoán vật tư của " + vatTuHangHoaCongCu.TenVatTu);
            var danhMucThietBi = _danhMucThietBiRepository.FirstOrDefault(d => d.MaDanhMucThietBiID == giaoKhoanVatTuChuaDanhMuc.MaDanhMucThietBiID)
                ?? throw new UserFriendlyException("Không tìm thấy danh mục thiết bị");

            for (var slXK = 0; slXK < 1; slXK++)
            {
                var code = _congCuDungCuRepository.GetAll().ToList().Select(d => d.Code).DefaultIfEmpty("0").Max();
                var maxCode = int.Parse(code);
                maxCode++;
                //Thêm  MaPhieuXuatKhoVatTuCT vào bảng công cụ dụng cụ 
                var congCuDungCu = new CongCuDungCu()
                {
                    MaVatTuHangHoa = vatTuHangHoaCongCu.MaVatTuHangHoa,
                    Code = maxCode.ToString().PadLeft(4, '0'),
                    ThoiGianBatDauSuDung = DateTime.Now.Date,
                    ThoiHanSuDungTheoDinhMuc = DateTime.Now.Date.AddMonths(danhMucThietBi.ThoiGianGiaoKhoan ?? 0),
                    ThoiHanSuDung = DateTime.Now.Date.AddMonths(danhMucThietBi.ThoiGianGiaoKhoan ?? 0),
                    //MaPhieuXuatKhoVatTuCT = item.Id,
                    MaDanhMucThietBiID = giaoKhoanVatTuChuaDanhMuc.MaDanhMucThietBiID ?? 0,
                };
                _congCuDungCuRepository.Insert(congCuDungCu);
                CurrentUnitOfWork.SaveChanges();

                // Chuyển vật tư vào lưu kho chờ cấp cho nhân viên
                var kiemKeCongCuDungCu = new KiemKeCongCuDungCu()
                {
                    MaCongCuDungCu = congCuDungCu.MaCongCuDungCu,
                    MaNhanVien = nhanvienchucvu.MaNhanVien,
                    MaChucVu = nhanvienchucvu.MaChucVu,
                    MaPhongBan = nhanvienchucvu.MaPhongBan,
                    LoaiKiemKe = "ThuHoiTaiSan",
                    HienTrangCongCuDungCu = "MOI",
                    LoaiThuHoiTaiSan = null,
                    ChiTietCongCuDungCu = "Công cụ được thêm từ xuất kho",
                    SoTienPhaiBoiThuong = null,
                    TT_BT = null,
                    STT = 1,
                    TrangThai = "LuuKho",
                    ThoiGianBatDau = DateTime.Now.Date,
                    ThoiGianKetThuc = DateTime.Now.Date,
                    ThoiGianSuDungConLai = DateTime.Now.Date.AddMonths(danhMucThietBi.ThoiGianGiaoKhoan ?? 0),
                    //ResourceId = input.ResourceId,
                };

                if (danhMucThietBi.KiemKeDinhKy == true)
                {
                    // tìm quý tiếp theo 
                    DateTime date = DateTime.Today;
                    int currentQuarter = (date.Month - 1) / 3 + 1;
                    int nextQuarter = currentQuarter == 4 ? 1 : currentQuarter + 1;
                    int nextQuarterYear = currentQuarter == 4 ? date.Year + 1 : date.Year;
                    int firstMonthOfNextQuarter = (nextQuarter - 1) * 3 + 1;
                    congCuDungCu.ThoiGianKiemKeLanToi = new DateTime(nextQuarterYear, firstMonthOfNextQuarter, 1);
                    if ((congCuDungCu.ThoiGianKiemKeLanToi.Value - date).TotalDays < 35)
                    {
                        congCuDungCu.ThoiGianKiemKeLanToi = congCuDungCu.ThoiGianKiemKeLanToi.Value.AddMonths(3);
                    }
                }
                else
                {
                    congCuDungCu.ThoiGianKiemKeLanToi = new DateTime(DateTime.Now.Year, 12, 10);
                    if (DateTime.Now.Month > 10)
                    {
                        congCuDungCu.ThoiGianKiemKeLanToi = congCuDungCu.ThoiGianKiemKeLanToi.Value.AddYears(1);
                    }
                }
                kiemKeCongCuDungCu.ThoiGianKiemKeLanToi = congCuDungCu.ThoiGianKiemKeLanToi;
                _kiemKeCongCuDungCuRepository.Insert(kiemKeCongCuDungCu);
                CurrentUnitOfWork.SaveChanges();

                congCuDungCu.MaKiemKeCongCuDungCu = kiemKeCongCuDungCu.MaKiemKeCongCuDungCu;
                _congCuDungCuRepository.Update(congCuDungCu);

                CurrentUnitOfWork.SaveChanges();
            }
            return true;
        }

        #endregion

        #region Công trình & Vị trí thi công
        public bool CreateViTriThiCong(int GiaoKhoanId, string DiaDiemThiCong, int MaVatTuHangHoa)
        {
            var viTriThiCong = new ViTriThiCong
            {
                DiaDiemThiCong = DiaDiemThiCong.Trim(),
                BaoCaoTienDo = true,
                KhuVucCongTy = false,
                Active = true
            };

            _viTriThiCongRepository.Insert(viTriThiCong);
            CurrentUnitOfWork.SaveChanges();

            //thêm tuyến ống báo cáo với vitrithicongid và code
            var tuyenOngBaoCao = new TuyenOngBaoCao
            {
                MaVatTuHangHoa = MaVatTuHangHoa,
                ViTriThiCongId = viTriThiCong.ViTriThiCongId,
                Active = true,
                GiaoKhoan = GiaoKhoanId,
                LuyKeDaHoanThanh = 0,
                LuyKeDaHoanThanhT4 = 0,
                TuyenOngCap1 = true
            };
            _tuyenOngBaoCaoRepository.Insert(tuyenOngBaoCao);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public async Task<TuyenOngBaoCao> AddTuyenOngVaoViTriThiCong(int ViTriThiCongId, int GiaoKhoanId, int MaVatTuHangHoa)
        {
            var task = await _viTriThiCongRepository.FirstOrDefaultAsync(d => d.ViTriThiCongId == ViTriThiCongId)
                ?? throw new UserFriendlyException("Không tìm thấy thông tin vị trí thi công");
            //thêm tuyến ống báo cáo với vitrithicongid và code
            var tuyenOngBaoCao = new TuyenOngBaoCao
            {
                MaVatTuHangHoa = MaVatTuHangHoa,
                ViTriThiCongId = ViTriThiCongId,
                GiaoKhoan = GiaoKhoanId != 0 ? GiaoKhoanId : 0,
                TuyenOngCap1 = true,
                Active = true,
                LuyKeDaHoanThanh = 0,
                LuyKeDaHoanThanhT4 = 0,
            };
            await _tuyenOngBaoCaoRepository.InsertAsync(tuyenOngBaoCao);
            CurrentUnitOfWork.SaveChanges();
            return await _tuyenOngBaoCaoRepository.FirstOrDefaultAsync(d => d.ViTriThiCongId == ViTriThiCongId);
        }
        public bool ThemChamCong(long phieuYeuCauId, string maNhanVien
            , DateTime thoiGianBatDau, DateTime thoiGianHoanThanh
            , string loaiCongTrinh, bool yeuCauXacNhan)
        {
            var phanCong = _chamCongCongTrinhRepository.FirstOrDefault(d =>
                d.MaNhanVien == maNhanVien
                && d.CreationTime.Date == thoiGianBatDau.Date
                && d.ThoiGianBatDau == null);

            if (phanCong == null)
            {
                phanCong = new ChamCongCongTrinh()
                {
                    MaNhanVien = maNhanVien,
                    PhieuYeuCauID = phieuYeuCauId,
                    ThoiGianBatDau = thoiGianBatDau,
                    ThoiGianHoanThanh = thoiGianHoanThanh,
                    LoaiCongTrinh = loaiCongTrinh,
                    TTXN = yeuCauXacNhan ? "TT_P" : "TT_A"
                };
                phanCong.TongThoiGian = (phanCong.ThoiGianHoanThanh - phanCong.ThoiGianBatDau).Value.TotalMinutes;
                if (phanCong.TongThoiGian <= 0)
                {
                    throw new UserFriendlyException("Khoảng thời gian không hợp lệ");
                }
                _chamCongCongTrinhRepository.Insert(phanCong);

                CurrentUnitOfWork.SaveChanges();
            }
            else
            {
                phanCong.ThoiGianBatDau = thoiGianBatDau;
                phanCong.ThoiGianHoanThanh = thoiGianHoanThanh;
                phanCong.TongThoiGian = (phanCong.ThoiGianHoanThanh - phanCong.ThoiGianBatDau).Value.TotalMinutes;
                phanCong.TTXN = yeuCauXacNhan ? "TT_P" : "TT_A";

                if (phanCong.TongThoiGian <= 0)
                {
                    throw new UserFriendlyException("Khoảng thời gian không hợp lệ");
                }
                _chamCongCongTrinhRepository.Update(phanCong);
            }
            
            CurrentUnitOfWork.SaveChanges();

            return true;
        }
        #endregion

        #region Quản lý phương tiện & GPS
        public List<CheckTrangThaiThietBiDinhViDto> CheckTrangThaiThietBiDinhVi()
        {
            var result = _viewXeMayDeviceRepository.GetAll()
                .Where(d => d.ThoiGianTruyenDuLieuGPS.HasValue && d.ThoiGianTruyenDuLieuGPS.Value.Date != DateTime.Now.Date)
                .OrderBy(d => d.ThoiGianTruyenDuLieuGPS)
                .Select(d => new CheckTrangThaiThietBiDinhViDto
                {
                    XeMayDeviceID = d.Id,
                    DeviceId = d.DeviceId,
                    TenXeMay = d.TenXeMay,
                    BienKiemSoat = d.BienKiemSoat,
                    ThoiGianTruyenDuLieuGPS = d.ThoiGianTruyenDuLieuGPS,
                    ThoiGianTruyenDuLieuStatus = d.ThoiGianTruyenDuLieuStatus
                })
                .ToList();

            return result;
        }
        public bool UpdateLenhDieuXeMay(string Code, string ViTriBatDau, string ViTriHoanThanh, int? ChiSoDongHoCongToMetBatDau, int? ChiSoDongHoCongToMetHoanThanh, DateTime? ThoiGianBatDau, DateTime? ThoiGianHoanThanh)
        {
            var lenhDieuXeMay = _lenhDieuXeMayRepository.FirstOrDefault(x => x.Code == Code);
            if (lenhDieuXeMay == null)
            {
                throw new Exception("LenhDieuXeMay not found");
            }

            lenhDieuXeMay.ViTriBatDau = !string.IsNullOrEmpty(ViTriBatDau) ? ViTriBatDau : lenhDieuXeMay.ViTriBatDau;
            lenhDieuXeMay.ViTriHoanThanh = !string.IsNullOrEmpty(ViTriHoanThanh) ? ViTriHoanThanh : lenhDieuXeMay.ViTriHoanThanh;
            if (ChiSoDongHoCongToMetBatDau.HasValue)
            {
                lenhDieuXeMay.ChiSoDongHoCongToMetBatDau = ChiSoDongHoCongToMetBatDau.Value;
                lenhDieuXeMay.ChiSoDongHoBatDau = ChiSoDongHoCongToMetBatDau.Value;
            }
            if (ChiSoDongHoCongToMetHoanThanh.HasValue)
            {
                lenhDieuXeMay.ChiSoDongHoCongToMetHoanThanh = ChiSoDongHoCongToMetHoanThanh.Value;
                lenhDieuXeMay.ChiSoDongHoHoanThanh = ChiSoDongHoCongToMetHoanThanh.Value;
            }
            lenhDieuXeMay.SoKmDiChuyen = lenhDieuXeMay.ChiSoDongHoHoanThanh - lenhDieuXeMay.ChiSoDongHoBatDau;
            if (ThoiGianBatDau.HasValue)
            {
                lenhDieuXeMay.ThoiGianBatDau = ThoiGianBatDau.Value;
            }
            if (ThoiGianHoanThanh.HasValue)
            {
                lenhDieuXeMay.ThoiGianHoanThanh = ThoiGianHoanThanh.Value;
            }
            _lenhDieuXeMayRepository.Update(lenhDieuXeMay);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        #endregion

        #region Sản xuất nước
        public object UpdateHoaChatSXN(UpdateHoaChatSXNInput input)
        {
            var hoaChat = _hoaChatRepository.FirstOrDefault(d => d.Ngay.Date == input.Ngay.Date && d.Ca == input.Ca)
                            ?? throw new UserFriendlyException("Không tìm thấy thông tin hoá chất");

            hoaChat.HV_Voi = input.HV_Voi != 0 ? input.HV_Voi : hoaChat.HV_Voi;
            hoaChat.HV_Clo = input.HV_Clo != 0 ? input.HV_Clo : hoaChat.HV_Clo;
            hoaChat.HV_PAC = input.HV_PAC != 0 ? input.HV_PAC : hoaChat.HV_PAC;
            hoaChat.CB_Voi = input.CB_Voi != 0 ? input.CB_Voi : hoaChat.CB_Voi;
            hoaChat.CB_Clo = input.CB_Clo != 0 ? input.CB_Clo : hoaChat.CB_Clo;
            hoaChat.CB_PAC = input.CB_PAC != 0 ? input.CB_PAC : hoaChat.CB_PAC;
            hoaChat.HN_Voi = input.HN_Voi != 0 ? input.HN_Voi : hoaChat.HN_Voi;
            hoaChat.HN_Clo = input.HN_Clo != 0 ? input.HN_Clo : hoaChat.HN_Clo;
            hoaChat.HN_PAC = input.HN_PAC != 0 ? input.HN_PAC : hoaChat.HN_PAC;

            _hoaChatRepository.Update(hoaChat);
            CurrentUnitOfWork.SaveChanges();

            return new
            {
                hoaChat.HV_Voi,
                hoaChat.HV_Clo,
                hoaChat.HV_PAC,
                hoaChat.CB_Voi,
                hoaChat.CB_Clo,
                hoaChat.CB_PAC,
                hoaChat.HN_Voi,
                hoaChat.HN_Clo,
                hoaChat.HN_PAC,
                hoaChat.Ngay,
                hoaChat.Ca,
                Id = hoaChat.Id
            };
        }
        public bool XoaToanBoNhomCaTruc(DateTime ngay, int ca)
        {
            var task = _SXN_CaTrucRepository.GetAll().Where(t => t.NgayCaTruc.Date == ngay.Date && t.CaTruc == ca).FirstOrDefault();
            if (task != null)
            {
                var listNV = _lichTrucChiTietRepository.GetAll().Where(t => t.Ngay.Date == ngay.Date && t.Ca == ca);
                foreach (var temp in listNV)
                {
                    _lichTrucChiTietRepository.Delete(temp);
                }
                _SXN_CaTrucRepository.Delete(task);
                CurrentUnitOfWork.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }

        }
        public bool ThemNhanVienCongViecSXN(string maNhanVien, string congViec, int nhomCaTruc, string diaDiem)
        {
            var nhanvien = _nhanVienRepository.FirstOrDefault(d => d.MANV == maNhanVien) ?? throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            var nhanviencongviecSXN = _nhanVienCongViecSXNRepository.FirstOrDefault(d => d.MANV == nhanvien.MANV);
            if (nhanviencongviecSXN != null)
            {
                throw new UserFriendlyException("Nhân viên đã có công việc sản xuất nước");
            }
            else
            {
                if (nhanvien.MAPB != "XNSXN")
                {
                    nhanvien.MAPB = "XNSXN";
                    nhanvien.ViTriLamViec = diaDiem.Trim().ToUpper();
                    _nhanVienRepository.Update(nhanvien);
                }

                var newNhanVienCongViec = new SXN_NhanVienCongViecs()
                {
                    MANV = nhanvien.MANV,
                    NhomCaTruc = nhomCaTruc,
                    DiaDiem = diaDiem,
                    CongViec = congViec,
                };
                _nhanVienCongViecSXNRepository.Insert(newNhanVienCongViec);
                CurrentUnitOfWork.SaveChanges();

                var nhanVienCongViec = _NHANVIENCONGVIECRepository.FirstOrDefault(d => d.MANV == d.MANV && d.MACV == "SXN");
                if (nhanVienCongViec == null)
                {
                    var newNhanVienCongViecSXN = new NHANVIENCONGVIEC()
                    {
                        MANV = nhanvien.MANV,
                        MACV = "SXN"
                    };
                    _NHANVIENCONGVIECRepository.Insert(newNhanVienCongViecSXN);
                    CurrentUnitOfWork.SaveChanges();
                }

                var nhanVienCongViecSXN_CN = _NHANVIENCONGVIECRepository.FirstOrDefault(d => d.MANV == d.MANV && d.MACV == "SXN_CN");
                if (nhanVienCongViecSXN_CN == null)
                {
                    var newNhanVienCongViecSXNSXN_CN = new NHANVIENCONGVIEC()
                    {
                        MANV = nhanvien.MANV,
                        MACV = "SXN_CN"
                    };
                    _NHANVIENCONGVIECRepository.Insert(newNhanVienCongViecSXNSXN_CN);
                    CurrentUnitOfWork.SaveChanges();
                }
            }

            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public bool XoaNhanVienCongViecSXN(string maNhanVien)
        {
            var nhanvien = _nhanVienRepository.FirstOrDefault(d => d.MANV == maNhanVien) ?? throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            var nhanviencongviecSXN = _nhanVienCongViecSXNRepository.FirstOrDefault(d => d.MANV == nhanvien.MANV);
            if (nhanviencongviecSXN == null)
            {
                throw new UserFriendlyException("Không tìm thấy Nhân viên trong công việc sản xuất nước");
            }
            else
            {
                // xóa Nhân viên công việc
                var nhanVienCongViec = _NHANVIENCONGVIECRepository.FirstOrDefault(d => d.MANV == d.MANV && d.MACV == "SXN");
                if (nhanVienCongViec != null)
                {
                    _NHANVIENCONGVIECRepository.Delete(nhanVienCongViec);
                }

                var nhanVienCongViecSXN_CN = _NHANVIENCONGVIECRepository.FirstOrDefault(d => d.MANV == d.MANV && d.MACV == "SXN_CN");
                if (nhanVienCongViecSXN_CN != null)
                {
                    _NHANVIENCONGVIECRepository.Delete(nhanVienCongViecSXN_CN);
                }

                _nhanVienCongViecSXNRepository.Delete(nhanviencongviecSXN);
            }

            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        #endregion

        #region Khai báo ngày nghỉ, ra ngoài  
        public bool XoaKhaiBaoNgayNghiDaPheDuyet(long KhaiBaoNgayNghiID)
        {
            var khaiBaoNgayNghi = _khaiBaoNgayNghiRepository.FirstOrDefault(nv => KhaiBaoNgayNghiID == nv.KhaiBaoNgayNghiID) ?? throw new UserFriendlyException("Không tìm thấy phiếu khai báo");
            khaiBaoNgayNghi.IsDeleted = true;
            _khaiBaoNgayNghiRepository.Update(khaiBaoNgayNghi);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public object XoaThoiGianKetThucThucTeRaNgoai(int KhaiBaoID)
        {
            var khaiBao = _khaiBaoRaNgoaiRepository.FirstOrDefault(d => d.KhaiBaoID == KhaiBaoID) ?? throw new UserFriendlyException("Không tìm thấy thông tin khai báo");
            khaiBao.ThoiGianKetThucThucTe = null;
            _khaiBaoRaNgoaiRepository.Update(khaiBao);
            CurrentUnitOfWork.SaveChanges();
            return new
            {
                khaiBao.KhaiBaoID,
                khaiBao.MANV,
                khaiBao.TuNgay,
                khaiBao.DenNgay,
                khaiBao.ThoiGianKetThucThucTe,
                khaiBao.ThoiGianBatDauThucTe,
                khaiBao.ThoiGianXacNhan,
            };
        }
        #endregion

        #region Quản lý khách hàng
        public bool UpdateTTHSMangCap4(string maddk, string newTTHS)
        {
            var donDangKy = _donDangKyRepository.FirstOrDefault(d => d.MADDK == maddk);
            if (donDangKy == null)
            {
                throw new UserFriendlyException("Không tìm thấy thông tin đơn đăng ký");
            }

            donDangKy.TTHS = newTTHS;
            _donDangKyRepository.Update(donDangKy);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public async Task<bool> UpdateHoaDonDienTuLoi(Guid maHoaDonDienTu)
        {
            var hoaDonDienTu = await _hoaDonDienTuRepository.FirstOrDefaultAsync(d => d.MaHoaDonDienTu == maHoaDonDienTu);
            if (hoaDonDienTu == null)
            {
                throw new UserFriendlyException("Không tìm thấy hóa đơn điện tử");
            }

            hoaDonDienTu.TrangThaiHoaDon = "XacNhanKeToan";
            hoaDonDienTu.DaKy = false;

            await _hoaDonDienTuRepository.UpdateAsync(hoaDonDienTu);
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateKeToanXacNhanTieuThuCT(string idkh, int? thang , int? nam)
        {
            thang ??= DateTime.Now.Month;
            nam ??= DateTime.Now.Year;
            var tieuthu = await _TIEUTHUCTRepository.FirstOrDefaultAsync(t => t.IDKH == idkh && t.THANG == thang && t.NAM == nam);
            if (tieuthu == null)
            {
                throw new UserFriendlyException("Không tìm thấy thông tin tiêu thụ");
            }
            tieuthu.KeToanXacNhan = false;
            await _TIEUTHUCTRepository.UpdateAsync(tieuthu);
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }
        #endregion

        #region Lịch sử cuộc gọi 
        public bool HuyDonDangKy(List<string> input)
        {
            foreach (var MADDK in input)
            {
                var viewDonDangKyOfGoiDien = _viewDonDangKyOfGoiDienTNTTRepository.FirstOrDefault(d => d.MADDK == MADDK && d.ConNhuCauLDM == false
                    && string.IsNullOrEmpty(d.NoiDungYKienKhachHang) == false);
                if (viewDonDangKyOfGoiDien != null)
                {
                    var dondangky = _donDangKyRepository.FirstOrDefault(d => d.MADDK == viewDonDangKyOfGoiDien.MADDK) ?? throw new UserFriendlyException("Không thấy đơn đăng ký");
                    dondangky.IsHuy = true;
                    dondangky.ThoiGianHuy = DateTime.Now;
                    dondangky.LyDoHuy = viewDonDangKyOfGoiDien.NoiDungYKienKhachHang;
                    dondangky.MaNhanVienHuy = AbpSession.UserId;
                    _donDangKyRepository.Update(dondangky);
                    CurrentUnitOfWork.SaveChanges();
                }
                else
                {
                    //  throw new UserFriendlyException("Không tìm thấy thông tin đơn đăng ký");
                }
            }

            return true;
        }
        public bool CapNhatThongTinHuyDonDangKy(List<string> input)
        {
            foreach (var MADDK in input)
            {
                var viewDonDangKyOfGoiDien = _viewDonDangKyOfGoiDienTNTTRepository.FirstOrDefault(d => d.MADDK == MADDK && d.ConNhuCauLDM == false && string.IsNullOrEmpty(d.NoiDungYKienKhachHang) == true && d.IsHuy == true);
                if (viewDonDangKyOfGoiDien != null)
                {
                    var dondangky = _donDangKyRepository.FirstOrDefault(d => d.MADDK == viewDonDangKyOfGoiDien.MADDK) ?? throw new UserFriendlyException("Không thấy đơn đăng ký");
                    dondangky.ThoiGianHuy = DateTime.Now;
                    dondangky.MaNhanVienHuy = AbpSession.UserId;
                    dondangky.LyDoHuy = viewDonDangKyOfGoiDien.NoiDungYKienKhachHang;
                    _donDangKyRepository.Update(dondangky);
                    CurrentUnitOfWork.SaveChanges();
                }
                else
                {
                    throw new UserFriendlyException("Không tìm thấy thông tin đơn đăng ký: " + viewDonDangKyOfGoiDien.MADDK);
                }
            }

            return true;
        }
        public bool KhachHangConNhuCauLDM(List<long> input)
        {
            foreach (var PhieuYeuCauId in input)
            {
                var lichsu = _lichSuDienThoaiRepository.FirstOrDefault(d => d.PhieuYeuCauId == PhieuYeuCauId && d.ConNhuCauLDM == false && string.IsNullOrEmpty(d.NoiDungYKienKhachHang) == true)
                    ?? throw new UserFriendlyException("Không thấy lịch sử cuộc gọi");
                if (lichsu != null)
                {
                    lichsu.ConNhuCauLDM = true;
                    _lichSuDienThoaiRepository.Update(lichsu);
                    CurrentUnitOfWork.SaveChanges();
                }
                else
                {
                    throw new UserFriendlyException("Không tìm thấy thông tin lịch sử cuộc gọi khách hàng đăng ký mới");
                }
            }

            return true;
        }
        #endregion

        #region mạng cấp 4
        public bool ThemNhanVienLichTrucChiTiet(ThemNhanVienLichTrucChiTietInput input)
        {
            var task = _lichTrucThiCongRepository.FirstOrDefault(d => d.MaLichTrucThiCong == input.MaLichTrucThiCong) ?? throw new UserFriendlyException("Không tìm thấy thông tin lịch trực");
            var lichThiCongCT = _lichTrucThiCongCTRepository.FirstOrDefault(d => d.MaLichTrucThiCong == task.MaLichTrucThiCong) ?? throw new UserFriendlyException("Không tìm thấy thông tin lịch trực chi tiết");

            foreach (var NhanVien in input.NhanViens)
            {
                var viewNhanVien = _viewNhanVienRepository.FirstOrDefault(d => d.MaNhanVien == NhanVien.MaNhanVien) ?? throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
                /* chức vụ,KTMC4,KTSC4,TCMC4,TCSC4,TKT_SCHUA*/
                var lichTrucChiTiet = new LichTrucThiCongCT();
                lichTrucChiTiet.MaLichTrucThiCong = task.MaLichTrucThiCong;
                lichTrucChiTiet.ChucVu = NhanVien.ChucVu;
                lichTrucChiTiet.MaNhanVien = viewNhanVien.UserID;
                lichTrucChiTiet.LuyKeSoLanThucHien = 1;
                _lichTrucThiCongCTRepository.Insert(lichTrucChiTiet);
            }
            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public bool KetThucNgayLamViec()
        {
            var now = DateTime.Today.AddDays(-1).AddHours(17);
            var userId = AbpSession.UserId.Value;
            var viewNhanVien = _viewNhanVienRepository.FirstOrDefault(d => d.UserID == userId)
                ?? throw new UserFriendlyException("Lỗi", "Không tìm thấy nhân viên");
            var nhanVien = _nhanVienRepository.FirstOrDefault(d => d.MANV == viewNhanVien.MaNhanVien);

            var lastCongViec = _viewThucHienCongViecTo2KTRepository.FirstOrDefault(d => d.MaNhanVien == viewNhanVien.UserID
                    && (d.TrangThai == "TT_N" || d.TrangThai == "TT_P")
                    && d.NgayTinhLuong.Date == now.Date
            );
            if (lastCongViec != null)
            {
                throw new UserFriendlyException("Lỗi", "Vui lòng kết thúc công việc");
            }
            var ngayLamViec = _ngayLamViecRepository.FirstOrDefault(d => d.CreatorUserId == userId
                                                                    && d.Ngay.Date == now.Date);
            if ((ngayLamViec.NghiBuoiChieu == false || ngayLamViec.NghiBuoiSang == false) && ngayLamViec.TTDD != "TT_A")
                throw new UserFriendlyException("Lỗi", "Chưa thực hiện điểm danh");
            var thoiGianCoTheKetThucNgayLamViec = _thucHienCongViecTo2KTManager.GetThoiGianToiThieuKetThucLamViecOfTo2(viewNhanVien.MaNhanVien, ngayLamViec);
            if (now < thoiGianCoTheKetThucNgayLamViec) throw new UserFriendlyException("Lỗi", "Thời gian có thể kết thúc ngày làm việc: " + thoiGianCoTheKetThucNgayLamViec.ToString("HH:m"));

            ngayLamViec.TTHT = "TT_A";
            ngayLamViec.TTNT = "TT_P";
            ngayLamViec.ThoiGianDiemDanhCuoiNgay = DateTime.Now;
            //ngayLamViec.NoiDungCongViecCuoiNgay = lastCongViec.NoiDungCongViec;

            ngayLamViec.MaNhanVienNghiemThu = ERPConsts.UserID_PhoPhongKyThuatTo2;
            if (ngayLamViec.MaNhanVienNghiemThu == userId) ngayLamViec.MaNhanVienNghiemThu = ERPConsts.UserID_PhoTongGiamDoc;
            // Tính toán thời gian nghỉ trưa

            var checkNghiTrua = _thucHienCongViecTo2KTRepository.GetAll().Any(d => d.ThoiGianBatDau == now.Date
                && d.MaNhanVien == AbpSession.UserId.Value
                && d.Type == "NGHITRUA"
            );
            if (!checkNghiTrua)
            {
                var gioBatDauNghiTrua = GetGioKetThucLamViecBuoiSang();
                var gioKetThucNghiTrua = GetGioLamViecBuoiChieu();
                var diChuyenTrongGioNghi = _thucHienCongViecTo2KTRepository.GetAll().Where(d => d.ThoiGianBatDau == now.Date
                            && d.MaNhanVien == AbpSession.UserId.Value
                            && (d.Type == "DICHUYEN" || d.Type == "KHONG")
                            && (
                                (gioBatDauNghiTrua <= d.ThoiGianBatDau && d.ThoiGianBatDau <= gioKetThucNghiTrua)
                                || (gioBatDauNghiTrua <= d.ThoiGianHoanThanh.Value && d.ThoiGianHoanThanh.Value <= gioKetThucNghiTrua)
                                || (d.ThoiGianBatDau >= gioKetThucNghiTrua && d.ThoiGianHoanThanh.Value >= gioBatDauNghiTrua)
                            )).Select(d => new
                            {
                                d.MaThucHienCongViecTo2KT,
                                ThoiGianBatDau = new[] { gioBatDauNghiTrua, d.ThoiGianBatDau }.Max(),
                                ThoiGianHoanThanh = new[] { gioKetThucNghiTrua, d.ThoiGianHoanThanh.Value }.Min(),
                                TongThoiGian = (new[] { gioKetThucNghiTrua, d.ThoiGianHoanThanh.Value }.Min() - new[] { gioBatDauNghiTrua, d.ThoiGianBatDau.Value }.Max()).TotalMinutes
                            }).OrderByDescending(d => d.TongThoiGian).FirstOrDefault();
                if (diChuyenTrongGioNghi != null)
                {
                    var congViecDiChuyen = _thucHienCongViecTo2KTRepository.FirstOrDefault(d => d.MaThucHienCongViecTo2KT == diChuyenTrongGioNghi.MaThucHienCongViecTo2KT);
                    congViecDiChuyen.Type = "NGHITRUA";
                    _thucHienCongViecTo2KTRepository.Update(congViecDiChuyen);
                }
            }
            CurrentUnitOfWork.SaveChanges();
            // tính toán thời gian làm việc đây
            if (viewNhanVien.MaNhanVien == "nqhuy") ngayLamViec.DonGiaNgayCongKeHoach = 15400000 / 26;
            if (viewNhanVien.MaNhanVien == "ntlan") ngayLamViec.DonGiaNgayCongKeHoach = 14100000 / 26;
            if (viewNhanVien.MaNhanVien == "tthoa") ngayLamViec.DonGiaNgayCongKeHoach = 14100000 / 26;
            if (viewNhanVien.MaNhanVien == "hvhung") ngayLamViec.DonGiaNgayCongKeHoach = 20400000 / 26;
            var congViecs = _thucHienCongViecTo2KTRepository.GetAll().Where(d => d.MaNhanVien == viewNhanVien.UserID && d.NgayTinhLuong.Date == now.Date);
            ngayLamViec.TongGioLamViec = congViecs.Where(d => d.Type == "LAMVIEC").Sum(d => (d.ThoiGianHoanThanh.Value - d.ThoiGianBatDau.Value).TotalMinutes / 60);
            ngayLamViec.TongGioDiChuyen = congViecs.Where(d => d.Type == "DICHUYEN").Sum(d => (d.ThoiGianHoanThanh.Value - d.ThoiGianBatDau.Value).TotalMinutes / 60);
            ngayLamViec.TongGioChoViec = congViecs.Where(d => d.Type == "KHONG").Sum(d => (d.ThoiGianHoanThanh.Value - d.ThoiGianBatDau.Value).TotalMinutes / 60);
            ngayLamViec.TongGioChoViecTinhLuong = 0;
            ngayLamViec.TongGioDiChuyenTinhLuong = ngayLamViec.TongGioDiChuyen;
            ngayLamViec.TongGioLamViecTinhLuong = ngayLamViec.TongGioLamViec;
            ngayLamViec.TongGioTinhLuong = ngayLamViec.TongGioLamViecTinhLuong + ngayLamViec.TongGioDiChuyenTinhLuong;
            if (ngayLamViec.TongGioTinhLuong < 8) ngayLamViec.HeSoDieuChinh = 1;
            else
            {
                ngayLamViec.HeSoDieuChinh = 8 / ngayLamViec.TongGioTinhLuong;
            }
            ngayLamViec.TongGioTinhLuongSauDieuChinh = ngayLamViec.TongGioTinhLuong * ngayLamViec.HeSoDieuChinh;
            _ngayLamViecRepository.Update(ngayLamViec);
            nhanVien.MaThucHienCongViecTo2KT = null;
            _nhanVienRepository.Update(nhanVien);
            return true;
        }
        private DateTime GetGioLamViecBuoiChieu()
        {
            DateTime now = DateTime.Today.AddDays(-1).AddHours(17);
            var thoiGianBatDauMuaHe = new DateTime(now.Year, 4, 30);
            var thoiGianKetThucMuaHe = new DateTime(now.Year, 9, 1);
            if (now > thoiGianBatDauMuaHe && now < thoiGianKetThucMuaHe)
            {
                return new DateTime(now.Year, now.Month, now.Day, 15, 00, 0);
            }
            return new DateTime(now.Year, now.Month, now.Day, 13, 30, 0);
        }
        private DateTime GetGioKetThucLamViecBuoiSang()
        {
            DateTime now = DateTime.Today.AddDays(-1).AddHours(17);
            var thoiGianBatDauMuaHe = new DateTime(now.Year, 4, 30);
            var thoiGianKetThucMuaHe = new DateTime(now.Year, 9, 1);
            if (now > thoiGianBatDauMuaHe && now < thoiGianKetThucMuaHe)
            {
                return new DateTime(now.Year, now.Month, now.Day, 10, 00, 0);
            }
            return new DateTime(now.Year, now.Month, now.Day, 11, 30, 0);
        }
        public bool PhanCongNhanVienKyThuatofList(string maNhanVien, List<string> maddks)
        {
            if (AbpSession.UserId.Value != 165 && AbpSession.UserId.Value != 442)
                throw new UserFriendlyException("Nhân viên này không có quyền thực hiện");
            var nhanVien = _viewNhanVienRepository.FirstOrDefault(d => d.MaNhanVien == maNhanVien);
            if (nhanVien == null)
            {
                throw new UserFriendlyException("Không tìm thấy thông tin nhân viên");
            }
            foreach (var maddk in maddks)
            {
                var donDangKy = _donDangKyRepository.FirstOrDefault(d => d.MADDK == maddk) ?? throw new UserFriendlyException("Không tìm thấy đơn đăng ký");
                if (donDangKy.TTTC == "TC_A")
                {
                    throw new UserFriendlyException("Công trình đã thi công");
                }
                var action = ERPConsts.LapDatMoi_003;
                if (donDangKy.LOAIDK == "TDH2" || donDangKy.LOAIDK == "LDTDH")
                {
                    action = ERPConsts.ThayDongHo_004;
                }
                if (maNhanVien != donDangKy.MaNhanVienKyThuat)
                {
                    donDangKy.MaNhanVienKyThuat = maNhanVien;
                    _phieuYeuCauManager.DeleteCongViecPhieuYeuCauToUser(donDangKy.PhieuYeuCauID.Value, action);
                    CurrentUnitOfWork.SaveChanges();
                }
                if (donDangKy.TTPCKT != TTPCKT.PC_A.ToString())
                {
                    donDangKy.NGAYPCKT = DateTime.Now;
                    donDangKy.TTPCKT = TTPCKT.PC_A.ToString();
                    donDangKy.TTDK = TTDK.DK_A.ToString();
                    donDangKy.TTPL = TTPL.PL_N.ToString();
                    donDangKy.TTTK = TTTK.TK_P.ToString();
                }
                _donDangKyRepository.Update(donDangKy);
                var phanCongThucHien = _phieuYeuCauManager.CongViecPhieuYeuCauToUser(donDangKy.PhieuYeuCauID.Value
                   , nhanVien.UserID
                   , action
                   , DateTime.Now.AddHours(12)
                   , "Khảo sát, thiết kế lập dựa toán"
                   , true);
                _backgroundJobManager.Enqueue<NotificationJob, NotificationJobArgs>(new NotificationJobArgs()
                {
                    Type = "NotificationToXuLyChinhOfCongViec",
                    PhieuYeuCauID = donDangKy.PhieuYeuCauID.Value,
                    CongViecPhieuYeuCauID = phanCongThucHien.CongViecPhieuYeuCauID,
                    AuthorId = nhanVien.UserID,
                    EntityTable = "MangCap4",
                    EntityKey1 = donDangKy.MADDK,
                    EntityKey2 = phanCongThucHien.CongViecPhieuYeuCauID.ToString(),
                    Action = action,
                    Title = "Khảo sát đơn lắp đặt khách hàng: " + donDangKy.MADDK,
                    Content = "Khảo sát đơn lắp đặt khách hàng: " + donDangKy.TENKH + ", địa chỉ: " + donDangKy.DIACHILD
                });
            }

            return true;
        }
        #endregion

    }
}