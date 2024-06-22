export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

export const programsColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "nameprogram",
    headerName: "NameProgram",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.programname}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 320,
  },

  {
    field: "point",
    headerName: "Point",
    width: 70,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 70,
  },
  {
    field: "createAt",
    headerName: "CreateAt",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const programRows = [
  {
    id: 1,
    programname: "CHƯƠNG TRÌNH ĐỐI THOẠI VỚI DOANH NGHIỆP – GẶP MẶT CỰU SINH VIÊN 2024",
    img: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/448804938_1236716361099856_426828684809501695_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEWvhpExn-98svsBtxEE2GiEGJTKZtZSCEQYlMpm1lIIak76E3_0DiPp8ydiuQz-LjIYMrRV2f4b8t_wf6UT3Me&_nc_ohc=tfxazIuh5bQQ7kNvgFca_ht&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYBZfp5rcT32J4QNry8Rm0ajigBLIiEhDFEUoavvVs5Wbw&oe=6678D8B0",
    description:"Đồng hành song song với chương trình là sự góp mặt và hỗ trợ đầy nhiệt tình đến từ các đơn vị Doanh nghiệp có tiếng trong ngành, Đoàn - Hội khoa Điện - Điện tử xin trân trọng giới thiệu 2 Doanh nghiệp sẽ cùng giao lưu với chúng ta trong chương trình “ĐỐI THOẠI VỚI DOANH NGHIỆP – GẶP MẶT CỰU SINH VIÊN 2024” :/nCông ty Cổ phần Tập đoàn DAT (DAT Group) là nhà cung cấp thiết bị và phát triển giải pháp dẫn đầu thị trường Việt Nam trong lĩnh vực tự động hóa công nghiệp và năng lượng tái tạo. /nCông ty TNHH Giải pháp Phần mềm Tường Minh (TMA Solution) là Doanh nghiệp với hơn 20 năm kinh nghiệm trong ngành viễn thông, TMA Solutions là nhà cung cấp dịch vụ viễn thông hàng đầu và là chuyên gia phát triển phần mềm viễn thông.Với sự đồng hành của hai đơn vị đồng hành chúng tôi tin chắc rằng sẽ mang đến cho các bạn sinh viên rõ hơn về các cơ hội việc làm cũng như định hướng cho tương lai. BTC chương trình xin gửi lời cảm ơn chân thành đến Qúy đơn vị. Đoàn – Hội khoa Điện – Điện tử kính chúc quý đơn vị phát triển thịnh vượng và gặt hái nhiều thành công trong tương lai.",
    point:0.5,
    quantity:100,
    createAt: "20/11/2024",
    status:"pending"
  },
  {
    id: 2,
    programname: "CHƯƠNG TRÌNH ĐỐI THOẠI VỚI DOANH NGHIỆP - GẶP MẶT CỰU SINH VIÊN 2024",
    img: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/448508595_1236039517834207_5756905287843631428_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH2_iypUeL6kMatwb--IHB1kAmc52KF-_yQCZznYoX7_IJslHJ03fAy8KhxKdWvifkgpeVSR8lP3DTLEuhwwuPq&_nc_ohc=UrkYSQFuv3wQ7kNvgHr6n3g&_nc_ht=scontent.fsgn2-5.fna&oh=00_AYAupCr2ouR7EcwWbAiprxboxahbq0OwXQVGdnvYoWtytg&oe=6678DC60",
    description:"Sau khi hoàn thành khóa học bạn sẽ làm gì? Ở đâu? Cơ hội và mục tiêu của bạn là gì? Nhu cầu tuyển dụng hiện nay của các Doanh nghiệp không thể đáp ứng đủ mong muốn của toàn bộ sinh viên trên cả nước. Để có thể trở thành một trong những ứng cử viên sáng giá thì bạn bắt buộc phải trang bị một số kiến thức tất yếu về nhu cầu thiết yếu của thị trường và các kỹ năng cần thiết. Chính vì vậy Đoàn Hội Khoa Điện - Điện Tử  tổ chức Chương trình ĐỐI THOẠI VỚI DOANH NGHIỆP - GẶP MẶT CỰU SINH VIÊN 2024 nhằm để giúp các sinh viên có các góc nhìn rõ hơn về ngành học, công việc sau khi ra trường.Tại đây sinh viên có thể gặp gỡ các doanh nghiệp để hiểu rõ hơn về nhu cầu tuyển dụng của các doanh nghiệp đối với các sinh viên mới ra trường và cựu sinh viên là những anh chị đi trước với những kinh nghiệm đúc kết được sẽ lắng nghe các chia sẻ về ngành học. Bên cạnh đó các anh chị cựu sinh viên cũng sẽ đưa ra các định hướng về ngành học tại Học viện Hàng Không Việt Nam, đặc biệt liên quan đến các ngành Điện - Điện tử. Hãy cùng đăng ký tham gia chương trình để trau chuốt cho bản thân một hành trang kĩ năng vững chắc và tiến gần hơn đến với mục đích của mình nhé!",
    point:0.5,
    quantity:100,
    createAt: "02/09/2024",
    status:"passive"
  },
  {
    id: 3,
    programname: "BẬT MÍ NHỮNG BÍ MẬT [CHUYÊN ĐỀ SỨC KHỎE SINH SẢN - GIÁO DỤC HÀNH VI] NĂM 2024",
    img: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/439941713_1205748334196659_167217516231593561_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEnwk08TdVeuIWxhbFxw8tR0Qn0iz5xLJ_RCfSLPnEsn4PDxC1aFBHAtCpLbT37ZMKVDkj6PhH3fC18sj_ETtp6&_nc_ohc=bbOF1W1sc8cQ7kNvgHZUbWx&_nc_ht=scontent.fsgn2-6.fna&oh=00_AYBt5xULiAJ0fcbMWGI4eIZkWewP2VZcHdP5-Kcc623tTQ&oe=6678E25F",
    description:"Talkshow “Sức khỏe sinh sản - Giáo dục hành vi năm 2024 là chương trình giao lưu cùng các bạn Đoàn viên Thanh niên,  Sinh viên Học viện trong khuôn khổ Chào mừng Đại hội Đại biểu Đoàn Thanh niên Cộng sản Hồ Chí Minh Học viện Hàng không Việt Nam lần thứ XII, Nhiệm kỳ 2024 - 2027.❤️ Đồng hành trong chương trình sắp tới với vai trò “Diễn giả trong Talkshow Sức khỏe sinh sản - Giáo dục hành vi năm 2024 là:  - Tiến sĩ, Bác sĩ Ngô Thị Yên - Ủy viên Thường vụ Hội Kế hoạch hóa gia đình Việt Nam.  - Thạc sĩ, Bác sĩ Phan Minh Nhựt - Tổng Giám đốc Công ty Cổ phần Lộc Phát Sài Gòn - Chánh văn phòng Hội Phẫu thuật Tạo hình thẩm mỹ Việt Nam. Với những kinh nghiệm và trải nghiệm trong lĩnh vực chuyên môn của mình, hai vị Bác sĩ sẽ có rất nhiều những chia sẻ gần gũi và thiết thực về các phương diện chăm sóc sức khỏe sinh sản tuổi thành niên cũng như các vấn đề về tâm sinh lý, hành vi tâm lý, cảm xúc tuổi mới lớn của chúng mình.",
    point:0.5,
    quantity:400,
    createAt: "24/07/2024",
    status:"active"
  }
]