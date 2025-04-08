import React from "react";
import Member from "./Member";
import anh from "./../assets/avatar-icon.avif";

const members = [
  { id: 1, name: "Đỗ Long Nghĩa", username: "nghialong", avatar: anh },
  { id: 2, name: "Nguyễn Văn A", username: "nguyenvana", avatar: anh },
  { id: 3, name: "Trần Văn B", username: "tranvanb", avatar: anh },
  { id: 4, name: "Lê Thị C", username: "lethic", avatar: anh },
  { id: 5, name: "Phạm Quốc Dũng", username: "phamquocdung", avatar: anh },
  { id: 6, name: "Hoàng Minh Tú", username: "hoangminhtu", avatar: anh },
  { id: 7, name: "Võ Nhật Huy", username: "vonhathuy", avatar: anh },
  { id: 8, name: "Bùi Văn Khoa", username: "buivankhoa", avatar: anh },
  { id: 9, name: "Đặng Thị Lan", username: "dangthilan", avatar: anh },
  { id: 10, name: "Trương Thanh Hải", username: "truongthanhhai", avatar: anh },
  { id: 11, name: "Lý Phương Anh", username: "lyphuonganh", avatar: anh },
  { id: 12, name: "Ngô Hữu Thành", username: "ngohuuthanh", avatar: anh },
  { id: 13, name: "Dương Thế Nam", username: "duongthenam", avatar: anh },
  { id: 14, name: "Lâm Văn Hòa", username: "lamvanhoa", avatar: anh },
  { id: 15, name: "Đoàn Ngọc Hân", username: "doanngochan", avatar: anh },
  { id: 16, name: "Tạ Quang Hưng", username: "taquanghung", avatar: anh },
  { id: 17, name: "Vũ Hải Yến", username: "vuhaiyen", avatar: anh },
  { id: 18, name: "Hồ Thanh Bình", username: "hothanhbinh", avatar: anh },
  { id: 19, name: "Nguyễn Bảo Châu", username: "nguyenbaochau", avatar: anh },
  { id: 20, name: "Lê Nhật Nam", username: "lenhatnam", avatar: anh },
  { id: 21, name: "Trịnh Minh Huy", username: "trinhminhhuy", avatar: anh },
  { id: 22, name: "Mai Hương Giang", username: "maihuonggiang", avatar: anh },
  { id: 23, name: "Phan Văn Kiệt", username: "phanvankiet", avatar: anh },
  { id: 24, name: "Châu Bảo Ngọc", username: "chaubaongoc", avatar: anh },
  { id: 25, name: "Lương Hoàng Anh", username: "luonghoanganh", avatar: anh },
  { id: 26, name: "Tô Hải Đăng", username: "tohaidang", avatar: anh },
  { id: 27, name: "Bạch Nhật Linh", username: "bachnhatlinh", avatar: anh },
  { id: 28, name: "Cao Văn Phúc", username: "caovanphuc", avatar: anh },
  { id: 29, name: "Giang Thùy Trang", username: "giangthuytrang", avatar: anh },
  { id: 30, name: "Đinh Gia Bảo", username: "dinhgiabao", avatar: anh },
  { id: 31, name: "Nguyễn Khánh Vy", username: "nguyenkhanhvy", avatar: anh },
  { id: 32, name: "Tống Minh Tú", username: "tongminhtu", avatar: anh },
];

const MemberList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {members.map((member) => (
        <Member
          key={member.id}
          name={member.name}
          username={member.username}
          avatar={member.avatar}
        />
      ))}
    </div>
  );
};

export default MemberList;