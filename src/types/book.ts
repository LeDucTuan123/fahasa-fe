export interface BookType {
  id: any;
  title: string;
  author: string;
  images: string;
  price: number;
  discount: number;
  description: string;
  stock?: string;
  productId?: string;
  //   ...
}

// Id int identity(1,1) primary key,
// 	Title nvarchar(255) not null,
// 	Author nvarchar(255) not null,
// 	Images varchar(500) not null,
// 	Price money not null,
// 	Discount int,
// 	Description ntext,
// 	Stock int not null,
// 	ProductId int not null,
// 	foreign key(ProductId) references Product(Id)
