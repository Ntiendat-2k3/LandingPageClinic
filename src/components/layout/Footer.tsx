import {
  Eye,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="font-space-grotesk font-bold text-xl">
                EyeCare Pro
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Phòng khám mắt chuyên nghiệp với đội ngũ bác sĩ giàu kinh nghiệm
              và trang thiết bị hiện đại, cam kết mang đến dịch vụ chăm sóc mắt
              tốt nhất cho bạn và gia đình.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-space-grotesk font-semibold text-lg">
              Dịch vụ
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Khám tổng quát mắt
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Điều trị cận thị
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Phẫu thuật Lasik
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Điều trị đục thủy tinh thể
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Khám mắt trẻ em
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Tư vấn kính áp tròng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-space-grotesk font-semibold text-lg">
              Liên hệ
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-cyan-400" />
                <span>123 Nguyễn Văn A, Phường 1, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>info@eyecarepro.vn</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="font-space-grotesk font-semibold text-lg">
              Giờ làm việc
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-cyan-400" />
                <div>
                  <div>Thứ 2 - Thứ 6: 8:00 - 18:00</div>
                  <div>Thứ 7: 8:00 - 16:00</div>
                  <div>Chủ nhật: 8:00 - 12:00</div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button className="btn-primary w-full">Đặt lịch ngay</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 EyeCare Pro. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
