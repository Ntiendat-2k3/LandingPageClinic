import { Star, Award, GraduationCap, Users } from "lucide-react";

const DoctorsSection = () => {
  const doctors = [
    {
      name: "PGS.TS Nguyễn Văn A",
      title: "Phó Giáo sư, Tiến sĩ",
      specialty: "Chuyên khoa Mắt",
      experience: "25 năm kinh nghiệm",
      education: "Đại học Y Hà Nội",
      achievements: [
        "Phó Giáo sư chuyên ngành Nhãn khoa",
        "Hơn 10,000 ca phẫu thuật thành công",
        "Chuyên gia hàng đầu về phẫu thuật Lasik",
      ],
      specialties: ["Phẫu thuật Lasik", "Đục thủy tinh thể", "Bệnh võng mạc"],
      rating: 4.9,
      patients: "5000+",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "BS.CKI Trần Thị B",
      title: "Bác sĩ Chuyên khoa I",
      specialty: "Nhãn khoa Trẻ em",
      experience: "15 năm kinh nghiệm",
      education: "Đại học Y Dược TP.HCM",
      achievements: [
        "Chuyên gia điều trị cận thị trẻ em",
        "Hơn 8,000 trẻ em được điều trị",
        "Giải thưởng Bác sĩ xuất sắc 2023",
      ],
      specialties: ["Cận thị trẻ em", "Khám mắt trẻ em", "Ortho-K"],
      rating: 4.8,
      patients: "3500+",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "BS.CKI Lê Văn C",
      title: "Bác sĩ Chuyên khoa I",
      specialty: "Phẫu thuật Mắt",
      experience: "18 năm kinh nghiệm",
      education: "Đại học Y Huế",
      achievements: [
        "Chuyên gia phẫu thuật đục thủy tinh thể",
        "Hơn 6,000 ca phẫu thuật",
        "Đào tạo tại Nhật Bản 2 năm",
      ],
      specialties: ["Đục thủy tinh thể", "Glaucoma", "Phẫu thuật võng mạc"],
      rating: 4.9,
      patients: "4200+",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  return (
    <section id="doctors" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đội ngũ bác sĩ chuyên nghiệp
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo bài bản và có chuyên
            môn cao, cam kết mang đến dịch vụ chăm sóc mắt tốt nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Doctor Image */}
              <div className="relative mb-6">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">
                      {doctor.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-space-grotesk text-xl font-bold text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-cyan-600 font-medium">{doctor.title}</p>
                  <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-full mx-auto mb-1">
                      <Users className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="font-semibold text-gray-900">
                      {doctor.patients}
                    </div>
                    <div className="text-xs text-gray-600">Bệnh nhân</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-full mx-auto mb-1">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="font-semibold text-gray-900">
                      {doctor.experience.split(" ")[0]}
                    </div>
                    <div className="text-xs text-gray-600">Năm KN</div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Học vấn
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {doctor.education}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Chuyên môn
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-6">
                    {doctor.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Thành tựu nổi bật
                  </div>
                  <ul className="space-y-1">
                    {doctor.achievements.map(
                      (achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs text-gray-600 leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className="w-full btn-primary">
                  Đặt lịch với bác sĩ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16">
          <div className="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Tại sao chọn đội ngũ của chúng tôi?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-cyan-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  15+
                </div>
                <div className="text-gray-600">Bác sĩ chuyên khoa</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  50K+
                </div>
                <div className="text-gray-600">Bệnh nhân đã điều trị</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  20+
                </div>
                <div className="text-gray-600">Năm kinh nghiệm trung bình</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <div className="font-space-grotesk text-3xl font-bold text-gray-900 mb-2">
                  4.9/5
                </div>
                <div className="text-gray-600">Đánh giá trung bình</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
