/**
 * =========================================================
 * 💖 CẤU HÌNH ALBUM SINH NHẬT - BÙI KHÁNH LINH (MCHOUU) 💖
 * =========================================================
 * Người nhận: Bùi Khánh Linh (Mchouu)
 * Ngày sinh: 22/08/2007
 * Tone màu: Hồng pastel & Nâu Mocha / Caramel ấm áp (Hợp Mệnh Thổ)
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

  // Danh sách nhạc nền
  audio: {
    autoplayOnOpen: true,
    defaultVolume: 0.75,
    playlist: [
      {
        title: "Happy Birthday Sweet Acoustic",
        artist: "Acoustic Love",
        src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-moment-114354.mp3"
      },
      {
        title: "Warm Memories & Piano",
        artist: "Sweet Love",
        src: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f77e30.mp3?filename=warm-memories-emotional-inspiring-piano-123447.mp3"
      },
      {
        title: "Cozy Lo-fi Love Story",
        artist: "Cozy Dreams",
        src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=sweet-love-121561.mp3"
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
  // 📖 DANH SÁCH CÁC TRANG TRONG ALBUM 3D
  // =========================================================
  pages: [
    // Trang bìa trước (Cover Album)
    {
      type: "cover",
      title: "Khánh Linh & Mchouu",
      subtitle: "Hành Trình Kỷ Niệm Của Cô Gái 22.08.2007",
      tag: "Happy Birthday ✨ 22.08",
      coverImage: "media/IMG_20260610_010152_534.jpg",
      quote: "Gặp được Khánh Linh là điều dịu dàng và tuyệt vời nhất... 🤎"
    },

    // Trang 1: Bắt đầu hành trình
    {
      type: "photo",
      src: "media/IMG_20260603_100758_821.jpg",
      date: "03.06.2026",
      title: "Nụ Cười Đầu Tiên 🌸",
      caption: "Khoảnh khắc nhìn thấy Khánh Linh cười, mọi mệt mỏi trong ngày của anh dường như tan biến hết.",
      stickers: ["🌸", "✨", "🎀"],
      tape: "mocha",
      rotation: -1.5
    },

    // Trang 2: Video khoảnh khắc đáng yêu
    {
      type: "video",
      src: "media/VID_20260603_111601_296.mp4",
      date: "03.06.2026",
      title: "Mchouu Siêu Đáng Yêu 🎬",
      caption: "Lúc nào em cũng mang lại năng lượng tích cực và sự dễ thương không ai sánh bằng!",
      stickers: ["🧸", "🤎", "🍓"],
      tape: "caramel",
      rotation: 1.8
    },

    // Trang 3: Những ngày tháng 6
    {
      type: "photo",
      src: "media/IMG_20260603_101151_621.jpg",
      date: "03.06.2026",
      title: "Dịu Dàng & Trong Trẻo 🌿",
      caption: "Ánh mắt trong veo và nét đẹp dịu dàng của cô gái sinh ngày 22/08.",
      stickers: ["🌿", "✨", "🤍"],
      tape: "brown",
      rotation: -2
    },

    // Trang 4: Video nhí nhảnh
    {
      type: "video",
      src: "media/VID_20260606_093228_155.mp4",
      date: "06.06.2026",
      title: "Những Trò Vui Tinh Nghịch 🌟",
      caption: "Cứ ở bên cạnh Mchouu là luôn tràn ngập tiếng cười và những câu chuyện không bao giờ dứt.",
      stickers: ["🎉", "⭐", "🐱"],
      tape: "mocha",
      rotation: 1.2
    },

    // Trang 5: Buổi tối ấm áp
    {
      type: "photo",
      src: "media/IMG_20260606_232501_287.jpg",
      date: "06.06.2026",
      title: "Bình Yên Bên Nhau 🌙",
      caption: "Có những ngày chỉ cần ngồi bên Linh, ngắm nhìn em là đủ thấy lòng ấm áp và an yên.",
      stickers: ["🌙", "💫", "🤎"],
      tape: "caramel",
      rotation: -1.2
    },

    // Trang 6: Video đáng nhớ
    {
      type: "video",
      src: "media/VID_20260609_103906_139.mp4",
      date: "09.06.2026",
      title: "Từng Giây Phút Quý Giá 💫",
      caption: "Mỗi thước phim ghi lại đều là một mảnh ghép kỷ niệm rực rỡ sắc màu cùng Khánh Linh.",
      stickers: ["🎬", "✨", "🌷"],
      tape: "brown",
      rotation: 2
    },

    // Trang 7: Bộ sưu tập rạng rỡ
    {
      type: "photo",
      src: "media/IMG_20260610_004150_906.jpg",
      date: "10.06.2026",
      title: "Góc Nghiêng Thần Thánh ✨",
      caption: "Khánh Linh luôn xinh đẹp nhất trong mọi khung hình, dù là góc chụp nào đi nữa!",
      stickers: ["👑", "💖", "✨"],
      tape: "mocha",
      rotation: -1.8
    },

    // Trang 8: Vẻ đẹp ngọt ngào
    {
      type: "photo",
      src: "media/IMG_20260610_004641_546.jpg",
      date: "10.06.2026",
      title: "Nắng Đọng Trên Môi ☀️",
      caption: "Cảm ơn em vì đã luôn là ánh nắng ấm áp chiếu rọi vào thế giới của anh.",
      stickers: ["☀️", "🌻", "🤎"],
      tape: "caramel",
      rotation: 1.5
    },

    // Trang 9: Đáng yêu hết nấc
    {
      type: "photo",
      src: "media/IMG_20260610_005048_819.jpg",
      date: "10.06.2026",
      title: "Mchouu Hờn Dỗi 🥺",
      caption: "Kể cả lúc chu môi hay giả vờ giận dỗi thì em vẫn cứ là đáng yêu số 1.",
      stickers: ["🥺", "🎀", "🍭"],
      tape: "mocha",
      rotation: -2.2
    },

    // Trang 10: Nụ cười tỏa nắng
    {
      type: "photo",
      src: "media/IMG_20260610_005416_785.jpg",
      date: "10.06.2026",
      title: "Tươi Tắn Rạng Ngời 🌸",
      caption: "Mong Linh của tuổi mới luôn giữ mãi nét hồn nhiên và nụ cười tỏa nắng này nhé.",
      stickers: ["🌸", "🌺", "🤎"],
      tape: "brown",
      rotation: 1.6
    },

    // Trang 11: Bức ảnh nghệ thuật
    {
      type: "photo",
      src: "media/IMG_20260610_010424_718.jpg",
      date: "10.06.2026",
      title: "Nàng Thơ Trong Mộng 🎨",
      caption: "Nếu vẻ đẹp là một tác phẩm nghệ thuật, thì Khánh Linh chính là kiệt tác tuyệt mỹ nhất.",
      stickers: ["🎨", "✨", "🤍"],
      tape: "caramel",
      rotation: -1.4
    },

    // Trang 12: Video tin nhắn / story
    {
      type: "video",
      src: "media/Screenrecorder-2026-06-18-00-03-10-283.mp4",
      date: "18.06.2026",
      title: "Những Đoạn Chat Đêm Khuya 💬",
      caption: "Những dòng tin nhắn trò chuyện thâu đêm suốt sáng, không bao giờ thấy chán.",
      stickers: ["💌", "💬", "🌙"],
      tape: "mocha",
      rotation: 1.8
    },

    // Trang 13: Kỷ niệm tháng 6
    {
      type: "photo",
      src: "media/IMG_20260629_185914_091.jpg",
      date: "29.06.2026",
      title: "Buổi Chiều Hoàng Hôn 🌇",
      caption: "Hoàng hôn buông xuống thật đẹp, nhưng vẫn không sánh bằng vẻ đẹp của Mchouu.",
      stickers: ["🌇", "🧡", "✨"],
      tape: "caramel",
      rotation: -1.7
    },

    // Trang 14: Video ngọt ngào tháng 8
    {
      type: "video",
      src: "media/VID_20260809_070802_121.mp4",
      date: "09.08.2026",
      title: "Buổi Sáng Ngập Tràn Nắng 🌞",
      caption: "Mỗi sớm mai thức dậy nghĩ đến Linh là lại có thêm thật nhiều động lực để cố gắng.",
      stickers: ["🌞", "☕", "🌻"],
      tape: "brown",
      rotation: 1.5
    },

    // Trang 15: Tháng sinh nhật của em
    {
      type: "photo",
      src: "media/IMG_20260809_200907_391.jpg",
      date: "09.08.2026",
      title: "Tháng Tám Của Khánh Linh 🎀",
      caption: "Tháng của cô gái xinh đẹp nhất, tháng của những điều ước ngọt ngào thành hiện thực.",
      stickers: ["🎀", "💐", "🤎"],
      tape: "mocha",
      rotation: -1.5
    },

    // Trang 16: Khoảnh khắc ngày sinh nhật
    {
      type: "photo",
      src: "media/IMG_20260822_133030_110.jpg",
      date: "22.08.2026",
      title: "Chào Đón Tuổi Mới 🎂",
      caption: "Hôm nay 22/08 là ngày đặc biệt nhất trong năm! Ngày mà thiên thần Bùi Khánh Linh chào đời.",
      stickers: ["🎂", "🎉", "👑"],
      tape: "caramel",
      rotation: 1.7
    },

    // Trang 17: Bánh Sinh Nhật & Thổi Nến Tương Tác
    {
      type: "cake",
      title: "Happy Birthday Bùi Khánh Linh!",
      subtitle: "Thổi nến sinh nhật cùng anh nhé Mchouu",
      caption: "Hãy nhắm mắt lại, ước một điều thật tuyệt vời và chạm vào ngọn nến để thổi nhé! 🕯️✨"
    },

    // Trang 18: Bức Thư Tình Gửi Em
    {
      type: "letter",
      title: "A Letter For Khánh Linh",
      subtitle: "Tâm tình gửi đến Mchouu tuổi mới"
    },

    // Trang bìa sau
    {
      type: "back-cover",
      title: "To Be Continued...",
      subtitle: "Hành trình yêu thương của chúng mình sẽ còn viết tiếp thật dài...",
      footer: "Made with all my heart for Bùi Khánh Linh (Mchouu) ❤️",
      tag: "Forever & Always 🤎"
    }
  ],

  // Danh sách toàn bộ media
  allMedia: [
    "media/IMG_20260603_100758_821.jpg",
    "media/IMG_20260603_101151_621.jpg",
    "media/IMG_20260606_232501_287.jpg",
    "media/IMG_20260606_232603_831.jpg",
    "media/IMG_20260606_232912_420.jpg",
    "media/IMG_20260610_002827_898.jpg",
    "media/IMG_20260610_002837_128.jpg",
    "media/IMG_20260610_002841_648.jpg",
    "media/IMG_20260610_004051_875.jpg",
    "media/IMG_20260610_004150_906.jpg",
    "media/IMG_20260610_004533_649.jpg",
    "media/IMG_20260610_004641_546.jpg",
    "media/IMG_20260610_004746_121.jpg",
    "media/IMG_20260610_004825_729.jpg",
    "media/IMG_20260610_004906_651.jpg",
    "media/IMG_20260610_004926_099.jpg",
    "media/IMG_20260610_005016_422.jpg",
    "media/IMG_20260610_005048_819.jpg",
    "media/IMG_20260610_005154_984.jpg",
    "media/IMG_20260610_005324_614.jpg",
    "media/IMG_20260610_005416_785.jpg",
    "media/IMG_20260610_005422_726.jpg",
    "media/IMG_20260610_005607_590.jpg",
    "media/IMG_20260610_005657_252.jpg",
    "media/IMG_20260610_005749_422.jpg",
    "media/IMG_20260610_005828_552.jpg",
    "media/IMG_20260610_005849_803.jpg",
    "media/IMG_20260610_005924_941.jpg",
    "media/IMG_20260610_005945_349.jpg",
    "media/IMG_20260610_010124_261.jpg",
    "media/IMG_20260610_010152_534.jpg",
    "media/IMG_20260610_010215_022.jpg",
    "media/IMG_20260610_010309_358.jpg",
    "media/IMG_20260610_010334_590.jpg",
    "media/IMG_20260610_010424_718.jpg",
    "media/IMG_20260610_010456_511.jpg",
    "media/IMG_20260610_010536_271.jpg",
    "media/IMG_20260610_010608_126.jpg",
    "media/IMG_20260610_010805_467.jpg",
    "media/IMG_20260610_010923_771.jpg",
    "media/IMG_20260610_011002_385.jpg",
    "media/IMG_20260610_011120_236.jpg",
    "media/IMG_20260610_011204_432.jpg",
    "media/IMG_20260610_011250_969.jpg",
    "media/IMG_20260610_011307_669.jpg",
    "media/IMG_20260610_011315_933.jpg",
    "media/IMG_20260610_011507_010.jpg",
    "media/IMG_20260610_011534_074.jpg",
    "media/IMG_20260629_185914_091.jpg",
    "media/IMG_20260809_200901_822.jpg",
    "media/IMG_20260809_200904_321.jpg",
    "media/IMG_20260809_200907_391.jpg",
    "media/IMG_20260822_133030_110.jpg",
    "media/IMG_20260822_133249_421.jpg",
    "media/Screenshot_2026-05-30-01-07-15-997_com.instagram.barcelona.jpg",
    "media/Screenshot_2026-05-30-22-44-14-286_com.instagram.android.jpg",
    "media/Screenshot_2026-06-18-00-02-34-757_com.instagram.android.jpg",
    "media/Screenshot_2026-06-27-23-45-36-941_com.instagram.android.jpg",
    "media/Screenshot_2026-08-22-13-35-20-532_com.instagram.android.jpg",
    "media/Screenshot_2026-08-22-13-35-23-753_com.instagram.android.jpg",
    "media/Screenshot_2026-08-22-13-35-53-081_com.instagram.android.jpg",
    "media/VID_20260603_111601_296.mp4",
    "media/VID_20260606_093228_155.mp4",
    "media/VID_20260609_103906_139.mp4",
    "media/VID_20260809_070802_121.mp4",
    "media/Screenrecorder-2026-06-18-00-03-10-283.mp4",
    "media/Screenrecorder-2026-06-18-00-03-30-267.mp4",
    "media/Screenrecorder-2026-08-09-01-43-29-453.mp4",
    "media/Screenrecorder-2026-08-10-07-42-57-617.mp4"
  ]
};
