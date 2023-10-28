export const links = [
  {
    name: 'Sách trong nước',
    submenu: true,
    sublinks: [
      {
        Head: 'Văn học',
        sublink: [
          { name: 'T-shirt', link: '/' },
          { name: 'Casual shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
        ],
      },
      {
        Head: 'Bottomwear',
        sublink: [
          { name: 'T-shirt', link: '/' },
          { name: 'Casual shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
        ],
      },
      {
        Head: 'innerwear',
        sublink: [
          { name: 'T-shirt', link: '/' },
          { name: 'Casual shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
        ],
      },

      {
        Head: 'sleepwear',
        sublink: [
          { name: 'T-shirt', link: '/' },
          { name: 'Casual shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
        ],
      },
      {
        Head: 'footwear',
        sublink: [
          { name: 'T-shirt', link: '/' },
          { name: 'Casual shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
          { name: 'formal shirts', link: '/' },
        ],
      },
    ],
  },
];

interface Nav {
  id: number;
  title: string;
  icon: string;
  path: string;
}

export const List_nav: Nav[] = [
  {
    id: 1,
    title: 'Thông báo',
    icon: 'solar:bell-line-duotone',
    path: '/',
  },
  {
    id: 2,
    title: 'Giỏ hàng',
    icon: 'uil:cart',
    path: '/cart',
  },
  {
    id: 3,
    title: 'Tài khoảng',
    icon: 'bx:user',
    path: '/login',
  },
];
