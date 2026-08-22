/**
 * =========================================================
 * 💖 CẤU HÌNH ALBUM SINH NHẬT - BÙI KHÁNH LINH (MCHOUU) 💖
 * =========================================================
 * Người nhận: Bùi Khánh Linh (Mchouu)
 * Ngày sinh: 22/08/2007
 * 
 * BỐ CỤC XEN KẼ CHUẨN ĐẸP & LÃNG MẠN:
 * - Ảnh bìa chính: media/33.jpg (duy nhất ở bìa, không lặp lại)
 * - 5 CẶP TRANG ĐẦU (10 trang ảnh đầu): Hoàn toàn là hình ảnh kỷ niệm
 * - TỪ SPREAD 06 TRỞ ĐI: Xen kẽ nhịp nhàng 2 trang ảnh -> 1 trang [Ảnh Trái + Video Phải]
 * - Các cặp ảnh đôi dạng (x và x_2) luôn xuất hiện cùng nhau trên 1 cặp trang mở ra (x bên Trái, x_2 bên Phải)
 * - Tiêu đề & Lời nhắn được viết vô cùng lãng mạn, ngọt ngào và đong đầy tình cảm!
 */

window.CONFIG = {
  // Thông tin người nhận & người gửi
  recipientName: "Bùi Khánh Linh",
  recipientNickname: "Mchouu ✨",
  senderName: "Người thương em nhất",
  birthdayDate: "22/08/2007",
  themeColor: "#8d5b4c", // Nâu Mocha ấm áp

  // Tiêu đề trang web & Lời chào
  websiteTitle: "Happy Birthday Bùi Khánh Linh (Mchouu) 🎂✨ Món Quà Kỷ Niệm",
  intro: {
    badge: "Special Birthday Gift 💖",
    greeting: "Gửi Bùi Khánh Linh (Mchouu) - Cô gái tuyệt vời nhất 💖",
    hint: "Anh có một món quà bí mật muốn dành tặng em nhân ngày sinh nhật 22/08 đặc biệt này. Chạm nhẹ vào phong bì để mở ra nhé! ✨",
    buttonText: "Mở Hộp Quà Bí Mật 💌"
  },

  // Danh sách nhạc nền vui tươi & lãng mạn
  audio: {
    autoplayOnOpen: true,
    defaultVolume: 0.8,
    playlist: [
      {
        title: "Happy Birthday Sweet Acoustic 🎂",
        artist: "Acoustic Love & Sweet Guitar",
        src: "assets/audio/happy_birthday_acoustic.mp3"
      },
      {
        title: "Joyful Romantic Love Story 🌸",
        artist: "Sweet Melody & Joyful Heart",
        src: "assets/audio/joyful_love_story.mp3"
      },
      {
        title: "Sweet Acoustic Romance 💖",
        artist: "Romantic Piano & Guitar",
        src: "assets/audio/sweet_acoustic_romance.mp3"
      },
      {
        title: "Cheerful Birthday Celebration ✨",
        artist: "Happy Melody & Chibi Celebration",
        src: "assets/audio/cheerful_birthday_melody.mp3"
      }
    ]
  },

  // Trang Thổi Nến & Bánh Sinh Nhật
  cake: {
    title: "Happy Birthday Khánh Linh 🎂",
    subtitle: "Nhắm mắt lại, ước một điều ước thật đẹp rồi nhấn vào ngọn nến để thổi nhé! ✨",
    blownMessage: "🎉 Chúc Khánh Linh (Mchouu) tuổi mới luôn ngập tràn niềm vui, luôn xinh đẹp rạng ngời, bình an và hạnh phúc mỗi ngày! Yêu em rất nhiều! 💖",
    candleCount: 3
  },

  // Bức thư tình ở cuối cuốn album
  loveLetter: {
    title: "Bức Thư Gửi Khánh Linh Tuổi Mới 💌",
    date: "Ngày 22 Tháng 08 Năm 2026",
    paragraphs: [
      "Gửi Bùi Khánh Linh (Mchouu bé nhỏ của anh),",
      "Chúc mừng sinh nhật cô gái đặc biệt và đáng yêu nhất trên thế giới tròn tuổi mới! Chúc Linh luôn luôn vui tươi, nụ cười rạng rỡ như nắng mai và mọi ước mơ, hoài bão của em đều sẽ sớm trở thành hiện thực.",
      "Cảm ơn em vì đã đến và làm cho thế giới của anh trở nên dịu dàng, ngọt ngào và tràn đầy màu sắc. Từng nụ cười, từng ánh mắt và những khoảnh khắc được bên em đều là những điều vô giá mà anh luôn nâng niu, gìn giữ.",
      "Chúc cô gái Mệnh Thổ của anh luôn gặp thật nhiều may mắn, vững vàng, an yên và gặt hái được thật nhiều thành công trên con đường phía trước. Dù thế nào, anh vẫn sẽ luôn ở đây, đồng hành và yêu thương em mỗi ngày.",
      "Happy 19th Birthday, My Sweet Sunshine Bùi Khánh Linh! 🎂🌸🤎✨"
    ],
    signature: "Yêu Mchouu nhiều hơn mỗi ngày ❤️"
  },

  // =========================================================
  // 📖 TOÀN BỘ CÁC TRANG ALBUM (5 Cặp Đầu Toàn Ảnh -> Xen Kẽ Video)
  // =========================================================
  pages: [
  {
    "type": "cover",
    "title": "BÙI KHÁNH LINH",
    "subtitle": "Happy 19th Birthday • Mchouu ✨",
    "tag": "Special Birthday Edition ✨",
    "coverImage": "media/33.jpg",
    "quote": "Gặp được Khánh Linh là điều dịu dàng và tuyệt vời nhất trong cuộc đời anh... 🤎"
  },
  {
    "type": "photo",
    "src": "media/1.jpg",
    "date": "22.08.2007",
    "title": "Ánh Mắt Đầu Tiên 🌸",
    "caption": "Lần đầu gặp gỡ, ánh mắt dịu dàng của em đã làm bừng sáng cả thế giới trong anh.",
    "stickers": [
      "🌸",
      "✨",
      "🎀"
    ],
    "tape": "mocha",
    "rotation": -1.5
  },
  {
    "type": "photo",
    "src": "media/2.jpg",
    "date": "22.08.2007",
    "title": "Nụ Cười Say Đắm ✨",
    "caption": "Mỗi khi em cười, mọi âu lo muộn phiền ngoài kia bỗng chốc hóa thành hư không.",
    "stickers": [
      "🧸",
      "🤎",
      "🍓"
    ],
    "tape": "caramel",
    "rotation": 1.7
  },
  {
    "type": "photo",
    "src": "media/3.jpg",
    "date": "22.08.2007",
    "title": "Giai Điệu Tình Yêu 🎶",
    "caption": "Giọng nói trong trẻo của em là khúc ca êm dịu và ngọt ngào nhất anh từng nghe.",
    "stickers": [
      "🎶",
      "💖",
      "✨"
    ],
    "tape": "gold",
    "rotation": -1.3
  },
  {
    "type": "photo",
    "src": "media/4.jpg",
    "date": "22.08.2007",
    "title": "Chút Nắng Ngày Thu 🍂",
    "caption": "Em mang theo sự ấm áp dịu dàng của nắng thu sưởi ấm trái tim anh mỗi ngày.",
    "stickers": [
      "🍂",
      "☕",
      "🧡"
    ],
    "tape": "sand",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/5.jpg",
    "date": "22.08.2007",
    "title": "Nơi Bình Yên Nhất 🕊️",
    "caption": "Chỉ cần ở bên em, nơi đâu cũng là chốn bình yên mà trái tim anh muốn tìm về.",
    "stickers": [
      "🕊️",
      "🌸",
      "✨"
    ],
    "tape": "mocha",
    "rotation": -1.6
  },
  {
    "type": "photo",
    "src": "media/6.jpg",
    "date": "22.08.2007",
    "title": "Góc Nhỏ Dịu Êm ☕",
    "caption": "Những buổi chiều bình yên ngồi ngắm em, thời gian như muốn ngừng trôi lại.",
    "stickers": [
      "☕",
      "🌿",
      "🤎"
    ],
    "tape": "caramel",
    "rotation": 1.4
  },
  {
    "type": "photo",
    "src": "media/7.jpg",
    "date": "22.08.2007",
    "title": "Em Là Điều Tuyệt Nhất 🌟",
    "caption": "Giữa muôn vạn người, tìm thấy em là may mắn lớn nhất của cuộc đời anh.",
    "stickers": [
      "🌟",
      "👑",
      "✨"
    ],
    "tape": "gold",
    "rotation": -1.4
  },
  {
    "type": "photo",
    "src": "media/8.jpg",
    "date": "22.08.2007",
    "title": "Hương Vị Ngọt Ngào 🍓",
    "caption": "Tình yêu dành cho Linh ngọt ngào như vị dâu tây chín mọng đầu mùa.",
    "stickers": [
      "🍓",
      "🎀",
      "💖"
    ],
    "tape": "sand",
    "rotation": 1.6
  },
  {
    "type": "photo",
    "src": "media/9.jpg",
    "date": "22.08.2007",
    "title": "Ánh Nhìn Trong Veo 💖",
    "caption": "Đôi mắt tròn xoe trong veo như chứa cả bầu trời sao lấp lánh và yêu thương.",
    "stickers": [
      "💖",
      "✨",
      "🧸"
    ],
    "tape": "mocha",
    "rotation": -1.2
  },
  {
    "type": "photo",
    "src": "media/10.jpg",
    "date": "22.08.2007",
    "title": "Bình Minh Rạng Rỡ 🌅",
    "caption": "Khánh Linh tựa như ánh bình minh, xua tan mọi giá lạnh trong tâm hồn anh.",
    "stickers": [
      "🌅",
      "🌸",
      "✨"
    ],
    "tape": "caramel",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/11.jpg",
    "date": "22.08.2007",
    "title": "Những Bước Chân Đôi 👣",
    "caption": "Nắm tay em đi qua từng góc phố, con đường nào cũng hóa mộng mơ và hạnh phúc.",
    "stickers": [
      "👣",
      "🍁",
      "🤎"
    ],
    "tape": "sand",
    "rotation": -1.7
  },
  {
    "type": "photo",
    "src": "media/12.jpg",
    "date": "22.08.2007",
    "title": "Tựa Vào Vai Anh 🧸",
    "caption": "Dù giông bão ngoài kia thế nào, vai anh vẫn mãi là điểm tựa an toàn cho em.",
    "stickers": [
      "🧸",
      "🕊️",
      "✨"
    ],
    "tape": "gold",
    "rotation": 1.4
  },
  {
    "type": "photo",
    "src": "media/13.jpg",
    "date": "22.08.2007",
    "title": "Dịu Dàng Như Mây ☁️",
    "caption": "Nét đáng yêu thuần khiết của cô gái bé nhỏ làm anh say đắm khôn nguôi.",
    "stickers": [
      "☁️",
      "🌸",
      "🎀"
    ],
    "tape": "mocha",
    "rotation": -1.3
  },
  {
    "type": "photo",
    "src": "media/15.jpg",
    "date": "22.08.2007",
    "title": "Mỗi Ngày Thêm Yêu 🌿",
    "caption": "Càng hiểu em, anh lại càng thấy mình yêu em nhiều hơn ngày hôm qua.",
    "stickers": [
      "🌿",
      "💖",
      "✨"
    ],
    "tape": "caramel",
    "rotation": 1.6
  },
  {
    "type": "photo",
    "src": "media/18.jpg",
    "date": "22.08.2007",
    "title": "Bản Tình Ca Mùa Hạ 🌻",
    "caption": "Những kỷ niệm rực rỡ và đong đầy yêu thương của hai chúng mình.",
    "stickers": [
      "🌻",
      "💛",
      "✨"
    ],
    "tape": "sand",
    "rotation": -1.4
  },
  {
    "type": "video",
    "src": "media/1.mp4",
    "date": "22.08.2007",
    "title": "Khoảnh Khắc Rung Động 💫",
    "caption": "Từng cử chỉ đáng yêu của em đều khiến trái tim anh không ngừng loạn nhịp.",
    "stickers": [
      "🎬",
      "🎞️",
      "✨"
    ],
    "tape": "gold",
    "rotation": 1.4
  },
  {
    "type": "photo",
    "src": "media/16.jpg",
    "date": "22.08.2007",
    "title": "Nửa Vầng Trăng Khuyết 🌙",
    "caption": "Anh từng là một nửa chông chênh đi tìm mảnh ghép của riêng mình...",
    "stickers": [
      "🌙",
      "✨",
      "💫"
    ],
    "tape": "mocha",
    "rotation": -1.6
  },
  {
    "type": "photo",
    "src": "media/16_2.jpg",
    "date": "22.08.2007",
    "title": "Trọn Vẹn Yêu Thương 🌕",
    "caption": "...Cho đến khi gặp em, bức tranh hạnh phúc mới thực sự vẹn tròn và ấm áp.",
    "stickers": [
      "🌕",
      "💖",
      "🌸"
    ],
    "tape": "caramel",
    "rotation": 1.7
  },
  {
    "type": "photo",
    "src": "media/19.jpg",
    "date": "22.08.2007",
    "title": "Kho Báu Của Anh 💎",
    "caption": "Khánh Linh là điều quý giá và thiêng liêng nhất mà cuộc đời đã ban tặng cho anh.",
    "stickers": [
      "💎",
      "👑",
      "✨"
    ],
    "tape": "gold",
    "rotation": -1.2
  },
  {
    "type": "photo",
    "src": "media/27.jpg",
    "date": "22.08.2007",
    "title": "Lời Hẹn Ước Dưới Mưa 🌧️",
    "caption": "Dù nắng hay mưa, anh vẫn nguyện cùng em đi trọn vẹn đoạn đường phía trước.",
    "stickers": [
      "🌧️",
      "☕",
      "🤎"
    ],
    "tape": "sand",
    "rotation": 1.4
  },
  {
    "type": "photo",
    "src": "media/30.jpg",
    "date": "22.08.2007",
    "title": "Gửi Ngàn Nắng Ấm 🌤️",
    "caption": "Gửi trọn tình yêu chân thành và nồng nàn nhất đến cô gái Mệnh Thổ của anh.",
    "stickers": [
      "🌤️",
      "🍂",
      "🧡"
    ],
    "tape": "mocha",
    "rotation": -1.5
  },
  {
    "type": "video",
    "src": "media/2.mp4",
    "date": "22.08.2007",
    "title": "Nụ Cười Toả Nắng ☀️",
    "caption": "Chỉ cần nhìn thấy nụ cười ấy, một ngày của anh liền tràn ngập niềm vui.",
    "stickers": [
      "☀️",
      "🎬",
      "✨"
    ],
    "tape": "gold",
    "rotation": 1.3
  },
  {
    "type": "photo",
    "src": "media/20.jpg",
    "date": "22.08.2007",
    "title": "Ánh Mắt Trao Nhau 👀",
    "caption": "Khoảnh khắc nhìn sâu vào đôi mắt em, anh thấy cả tương lai hạnh phúc của mình.",
    "stickers": [
      "👀",
      "💖",
      "✨"
    ],
    "tape": "mocha",
    "rotation": -1.7
  },
  {
    "type": "photo",
    "src": "media/20_2.jpg",
    "date": "22.08.2007",
    "title": "Trái Tim Thổn Thức 💓",
    "caption": "Nhịp đập rộn ràng không thể giấu mỗi khi đôi bàn tay ta khẽ chạm vào nhau.",
    "stickers": [
      "💓",
      "🌸",
      "🎀"
    ],
    "tape": "caramel",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/22.jpg",
    "date": "22.08.2007",
    "title": "Phút Giây Hẹn Hò 🌹",
    "caption": "Những buổi hẹn ngập tràn tiếng cười và sự ngọt ngào không thể nào quên.",
    "stickers": [
      "🌹",
      "☕",
      "✨"
    ],
    "tape": "gold",
    "rotation": -1.4
  },
  {
    "type": "photo",
    "src": "media/22_2.jpg",
    "date": "22.08.2007",
    "title": "Dư Vị Hạnh Phúc 🍯",
    "caption": "Ký ức ngọt ngào như mật ong đọng lại trong từng góc nhỏ của tâm hồn.",
    "stickers": [
      "🍯",
      "🧸",
      "🤎"
    ],
    "tape": "sand",
    "rotation": 1.6
  },
  {
    "type": "photo",
    "src": "media/31.jpg",
    "date": "22.08.2007",
    "title": "Nhành Hoa Dịu Dàng 🌷",
    "caption": "Em xinh đẹp và thanh thuần như đóa hoa tulip nở rộ giữa sương sớm mai.",
    "stickers": [
      "🌷",
      "🌿",
      "💖"
    ],
    "tape": "mocha",
    "rotation": -1.3
  },
  {
    "type": "video",
    "src": "media/3.mp4",
    "date": "22.08.2007",
    "title": "Dáng Hình Đáng Yêu 🎀",
    "caption": "Từng khoảnh khắc hồn nhiên của em đều được anh cẩn thận khắc ghi trong tim.",
    "stickers": [
      "🎀",
      "🎬",
      "✨"
    ],
    "tape": "gold",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/23.jpg",
    "date": "22.08.2007",
    "title": "Dịu Dàng Nắng Sớm ☀️",
    "caption": "Gương mặt thanh tú đón lấy những tia nắng ban mai dịu dàng và ấm áp.",
    "stickers": [
      "☀️",
      "✨",
      "🌸"
    ],
    "tape": "mocha",
    "rotation": -1.6
  },
  {
    "type": "photo",
    "src": "media/23_2.jpg",
    "date": "22.08.2007",
    "title": "E Ấp Nụ Cười Xinh 😊",
    "caption": "Nét cười bẽn lẽn làm tan chảy mọi góc khuất trong trái tim của anh.",
    "stickers": [
      "😊",
      "🎀",
      "💖"
    ],
    "tape": "caramel",
    "rotation": 1.7
  },
  {
    "type": "photo",
    "src": "media/26.jpg",
    "date": "22.08.2007",
    "title": "Góc Nghiêng Thần Thánh ✨",
    "caption": "Đường nét tinh tế và cuốn hút của cô gái mà anh thương yêu nhất đời.",
    "stickers": [
      "✨",
      "👑",
      "💫"
    ],
    "tape": "gold",
    "rotation": -1.5
  },
  {
    "type": "photo",
    "src": "media/26_2.jpg",
    "date": "22.08.2007",
    "title": "Vẻ Đẹp Tự Nhiên 🌸",
    "caption": "Mộc mạc, trong trẻo và luôn rạng ngời theo cách riêng biệt của em.",
    "stickers": [
      "🌸",
      "🤎",
      "🧸"
    ],
    "tape": "sand",
    "rotation": 1.4
  },
  {
    "type": "photo",
    "src": "media/32.jpg",
    "date": "22.08.2007",
    "title": "Mãi Mãi Bên Nhau 💍",
    "caption": "Hứa sẽ luôn ở bên, chở che cho em suốt những năm tháng dài phía trước.",
    "stickers": [
      "💍",
      "🕊️",
      "✨"
    ],
    "tape": "mocha",
    "rotation": -1.4
  },
  {
    "type": "video",
    "src": "media/5.mp4",
    "date": "22.08.2007",
    "title": "Thế Giới Của Riêng Em 👑",
    "caption": "Trong mắt anh, em chính là nàng công chúa nhỏ lộng lẫy và đáng yêu nhất.",
    "stickers": [
      "👑",
      "🎬",
      "✨"
    ],
    "tape": "gold",
    "rotation": 1.6
  },
  {
    "type": "photo",
    "src": "media/28.jpg",
    "date": "22.08.2007",
    "title": "Những Mùa Nhớ Thương 🍁",
    "caption": "Dù là mùa nào trong năm, nỗi nhớ anh dành cho em vẫn luôn đong đầy da diết.",
    "stickers": [
      "🍁",
      "🍂",
      "🧡"
    ],
    "tape": "caramel",
    "rotation": -1.6
  },
  {
    "type": "photo",
    "src": "media/28_2.jpg",
    "date": "22.08.2007",
    "title": "Ấm Áp Ngày Gặp Lại 🧣",
    "caption": "Chiếc ôm ấm áp xua tan đi mọi khoảng cách và giá lạnh của ngày đông.",
    "stickers": [
      "🧣",
      "☕",
      "🤎"
    ],
    "tape": "mocha",
    "rotation": 1.7
  },
  {
    "type": "photo",
    "src": "media/34.jpg",
    "date": "22.08.2007",
    "title": "Bức Tranh Kỷ Niệm 🎨",
    "caption": "Mỗi ngày có em là một nét cọ tuyệt đẹp tô điểm cho cuộc sống thêm rực rỡ.",
    "stickers": [
      "🎨",
      "🌟",
      "✨"
    ],
    "tape": "gold",
    "rotation": -1.3
  },
  {
    "type": "photo",
    "src": "media/35.jpg",
    "date": "22.08.2007",
    "title": "Bình Yên Trong Tim 🕊️",
    "caption": "Chẳng cần cầu kỳ, chỉ cần có em ở bên là đã đủ trọn vẹn một ngày bình yên.",
    "stickers": [
      "🕊️",
      "💖",
      "🌸"
    ],
    "tape": "sand",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/37.jpg",
    "date": "22.08.2007",
    "title": "Nguyện Cầu Hạnh Phúc 🙏",
    "caption": "Mong những điều tốt lành và may mắn nhất luôn mỉm cười với Khánh Linh của anh.",
    "stickers": [
      "🙏",
      "✨",
      "💫"
    ],
    "tape": "mocha",
    "rotation": -1.5
  },
  {
    "type": "video",
    "src": "media/6.mp4",
    "date": "22.08.2007",
    "title": "Vũ Điệu Hạnh Phúc 💃",
    "caption": "Mỗi bước đi, mỗi nụ cười của Mchouu đều tràn ngập sự tươi vui và rạng rỡ.",
    "stickers": [
      "💃",
      "🎬",
      "✨"
    ],
    "tape": "gold",
    "rotation": 1.4
  },
  {
    "type": "photo",
    "src": "media/38.jpg",
    "date": "22.08.2007",
    "title": "Gửi Em Ngàn Lời Yêu 💌",
    "caption": "Tình cảm này anh viết ra không hết, chỉ mong dùng cả đời để chứng minh.",
    "stickers": [
      "💌",
      "🌹",
      "✨"
    ],
    "tape": "caramel",
    "rotation": -1.4
  },
  {
    "type": "photo",
    "src": "media/39.jpg",
    "date": "22.08.2007",
    "title": "Khoảnh Khắc Diệu Kỳ 🌟",
    "caption": "Mỗi giây phút được nhìn ngắm nụ cười em đều là một phép màu tuyệt đẹp.",
    "stickers": [
      "🌟",
      "🎀",
      "🤎"
    ],
    "tape": "sand",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/40.jpg",
    "date": "22.08.2007",
    "title": "Nụ Cười Mùa Thu 🍂",
    "caption": "Dịu dàng như làn gió thu nhẹ nhàng lướt qua mái tóc bồng bềnh của em.",
    "stickers": [
      "🍂",
      "☕",
      "🧡"
    ],
    "tape": "gold",
    "rotation": -1.6
  },
  {
    "type": "photo",
    "src": "media/41.jpg",
    "date": "22.08.2007",
    "title": "Tháng Năm Rực Rỡ 🌈",
    "caption": "Thanh xuân của anh trở nên tươi đẹp nhất chính là từ khoảnh khắc có em kề bên.",
    "stickers": [
      "🌈",
      "💖",
      "✨"
    ],
    "tape": "mocha",
    "rotation": 1.4
  },
  {
    "type": "photo",
    "src": "media/42.jpg",
    "date": "22.08.2007",
    "title": "Chút Hờn Dỗi Đáng Yêu 🥺",
    "caption": "Cả những lúc em dỗi hờn vu vơ cũng đáng yêu đến mức khiến anh chỉ muốn ôm chặt.",
    "stickers": [
      "🥺",
      "🧸",
      "🍓"
    ],
    "tape": "sand",
    "rotation": -1.3
  },
  {
    "type": "video",
    "src": "media/7.mp4",
    "date": "22.08.2007",
    "title": "Ánh Sao Trong Mắt Em ✨",
    "caption": "Những cử chỉ tinh nghịch, đáng yêu khiến anh chỉ muốn cưng chiều em mãi thôi.",
    "stickers": [
      "✨",
      "🎬",
      "💖"
    ],
    "tape": "gold",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/43.jpg",
    "date": "22.08.2007",
    "title": "Hẹn Ước Mai Sau ⏳",
    "caption": "Cùng nhau già đi, cùng nhau đón thêm thật nhiều mùa sinh nhật ngọt ngào nữa em nhé.",
    "stickers": [
      "⏳",
      "💍",
      "🌸"
    ],
    "tape": "mocha",
    "rotation": -1.5
  },
  {
    "type": "photo",
    "src": "media/44.jpg",
    "date": "22.08.2007",
    "title": "Ánh Mắt Chan Chứa 🤎",
    "caption": "Tình yêu thương vô bờ bến đọng lại trong từng ánh nhìn dịu dàng em trao.",
    "stickers": [
      "🤎",
      "✨",
      "💫"
    ],
    "tape": "gold",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/45.jpg",
    "date": "22.08.2007",
    "title": "Nắng Ấm Mệnh Thổ 🌾",
    "caption": "Cô gái mệnh Thổ của anh vững vàng, ấm áp và luôn giàu lòng nhân hậu.",
    "stickers": [
      "🌾",
      "☕",
      "🤎"
    ],
    "tape": "sand",
    "rotation": -1.4
  },
  {
    "type": "photo",
    "src": "media/46.jpg",
    "date": "22.08.2007",
    "title": "Dịu Ngọt Tình Ta 🍯",
    "caption": "Tình yêu của đôi mình êm đềm trôi qua từng tháng ngày bình yên và hạnh phúc.",
    "stickers": [
      "🍯",
      "💖",
      "✨"
    ],
    "tape": "caramel",
    "rotation": 1.6
  },
  {
    "type": "photo",
    "src": "media/47.jpg",
    "date": "22.08.2007",
    "title": "Gió Thổi Mùa Yêu 🍃",
    "caption": "Lắng nghe tiếng gió thì thầm những lời yêu thương chân thành anh gửi trao em.",
    "stickers": [
      "🍃",
      "🌿",
      "🌸"
    ],
    "tape": "gold",
    "rotation": -1.5
  },
  {
    "type": "video",
    "src": "media/8.mp4",
    "date": "22.08.2007",
    "title": "Thước Phim Tình Yêu 🎬",
    "caption": "Những khung hình quý giá nhất cuộc đời anh là khi trong đó luôn có hình bóng em.",
    "stickers": [
      "🎬",
      "🎞️",
      "💖"
    ],
    "tape": "gold",
    "rotation": 1.6
  },
  {
    "type": "photo",
    "src": "media/48.jpg",
    "date": "22.08.2007",
    "title": "Bình Minh Đầy Nắng ☀️",
    "caption": "Bắt đầu mỗi ngày mới bằng việc nhớ đến nụ cười rạng rỡ của Khánh Linh.",
    "stickers": [
      "☀️",
      "✨",
      "🧸"
    ],
    "tape": "mocha",
    "rotation": -1.4
  },
  {
    "type": "photo",
    "src": "media/49.jpg",
    "date": "22.08.2007",
    "title": "Trái Tim Đồng Điệu 💓",
    "caption": "Hai trái tim cùng chung một nhịp đập, cùng nhau hướng về tương lai ngập tràn niềm vui.",
    "stickers": [
      "💓",
      "👩‍❤️‍👨",
      "✨"
    ],
    "tape": "sand",
    "rotation": 1.3
  },
  {
    "type": "photo",
    "src": "media/50.jpg",
    "date": "22.08.2007",
    "title": "Mỗi Bước Em Đi 🌸",
    "caption": "Nguyện làm bóng râm che mát trên mọi nẻo đường chông gai em bước qua.",
    "stickers": [
      "🌸",
      "🎀",
      "💖"
    ],
    "tape": "caramel",
    "rotation": -1.5
  },
  {
    "type": "photo",
    "src": "media/51.jpg",
    "date": "22.08.2007",
    "title": "Hạnh Phúc Giản Đơn ☕",
    "caption": "Hạnh phúc giản đơn là những buổi chiều bình lặng cùng em trò chuyện dưới hiên nhà.",
    "stickers": [
      "☕",
      "🕊️",
      "🤎"
    ],
    "tape": "gold",
    "rotation": 1.6
  },
  {
    "type": "photo",
    "src": "media/52.jpg",
    "date": "22.08.2007",
    "title": "Khoảnh Khắc Vô Giá 💎",
    "caption": "Từng nụ cười, từng ánh mắt của em là báu vật vô giá không gì đánh đổi được.",
    "stickers": [
      "💎",
      "👑",
      "✨"
    ],
    "tape": "mocha",
    "rotation": -1.4
  },
  {
    "type": "photo",
    "src": "media/55.jpg",
    "date": "22.08.2007",
    "title": "Nét Đẹp Thuần Khiết 🌷",
    "caption": "Sự mộc mạc và thuần khiết của em luôn làm rung động sâu sắc trái tim anh.",
    "stickers": [
      "🌷",
      "🌿",
      "✨"
    ],
    "tape": "sand",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/53.jpg",
    "date": "22.08.2007",
    "title": "Trời Xanh Mây Trắng ☁️",
    "caption": "Bầu trời xanh mây trắng hôm nay đẹp tựa như chính nụ cười của em vậy.",
    "stickers": [
      "☁️",
      "✨",
      "🌸"
    ],
    "tape": "sand",
    "rotation": -1.5
  },
  {
    "type": "photo",
    "src": "media/53_2.jpg",
    "date": "22.08.2007",
    "title": "Yêu Em Say Đắm 💖",
    "caption": "Dù năm tháng có đổi thay, tình yêu này vẫn mãi nguyên vẹn nồng nàn như thuở ban đầu.",
    "stickers": [
      "💖",
      "🎀",
      "🤎"
    ],
    "tape": "caramel",
    "rotation": 1.7
  },
  {
    "type": "photo",
    "src": "media/56.jpg",
    "date": "22.08.2007",
    "title": "Giai Điệu Tương Lai 🎻",
    "caption": "Cùng nhau viết tiếp những chương tương lai tràn ngập niềm vui và tiếng cười rộn rã.",
    "stickers": [
      "🎻",
      "🎶",
      "💖"
    ],
    "tape": "gold",
    "rotation": -1.4
  },
  {
    "type": "photo",
    "src": "media/57.jpg",
    "date": "22.08.2007",
    "title": "Gửi Cô Gái Tuổi 19 👑",
    "caption": "Bước sang tuổi 19, chúc Khánh Linh (Mchouu) luôn xinh đẹp, rực rỡ và mãi mãi hạnh phúc bên anh.",
    "stickers": [
      "👑",
      "🤎",
      "✨"
    ],
    "tape": "mocha",
    "rotation": 1.5
  },
  {
    "type": "photo",
    "src": "media/58.jpg",
    "date": "22.08.2007",
    "title": "Nơi Tình Yêu Bắt Đầu 🌱",
    "caption": "Từ những bỡ ngỡ ban đầu, hạt mầm yêu thương đã lớn lên từng ngày trong tim...",
    "stickers": [
      "🌱",
      "✨",
      "🤎"
    ],
    "tape": "sand",
    "rotation": -1.6
  },
  {
    "type": "photo",
    "src": "media/58_2.jpg",
    "date": "22.08.2007",
    "title": "Mãi Mãi Một Tình Yêu 🌳",
    "caption": "...Và giờ đây đã trở thành tán cây râm mát chở che cho hạnh phúc của đôi ta.",
    "stickers": [
      "🌳",
      "💖",
      "🌸"
    ],
    "tape": "caramel",
    "rotation": 1.7
  },
  {
    "type": "cake",
    "title": "Happy Birthday Bùi Khánh Linh! 🎂",
    "subtitle": "Nhấn vào nến hoặc nút để thổi nến và ước điều ước sinh nhật nhé ✨",
    "blownMessage": "🎉 Chúc mừng sinh nhật Khánh Linh (Mchouu) tuổi 19 luôn luôn hạnh phúc, rạng rỡ và đạt được mọi ước mơ! 🎂✨🎉"
  },
  {
    "type": "letter",
    "title": "A Letter For Khánh Linh 💌",
    "subtitle": "Gửi em - món quà quý giá nhất cuộc đời anh"
  },
  {
    "type": "back-cover",
    "title": "To Be Continued...",
    "subtitle": "Hành trình của chúng mình sẽ còn viết tiếp thật nhiều trang nữa 🤎",
    "footerNote": "Created with infinite love for Bùi Khánh Linh (22/08/2007)"
  }
]
};
