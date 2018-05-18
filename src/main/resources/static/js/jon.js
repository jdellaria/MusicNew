
var data = [
  {id: 1, author: "Jon Dellaria", text: "This is Jon comment"},
  {id: 2, author: "Bene Lamy", text: "This is Bene comment"},
  {id: 3, author: "Maeva Dellaria", text: "This is Maeva comment"},
  {id: 4, author: "Anais Dellaria", text: "This is Anais comment"},
  {id: 5, author: "Ethlyn Dellaria", text: "This is comment"},
  {id: 6, author: "Jody Dellaria", text: "This is comment"},
  {id: 7, author: "Terry Wood", text: "This is comment"}
];



class ItemBox extends React.Component {
   constructor(props) {
      super(props);
   }
   render() 
   {
    return (
      <div className="itemBox">
        <div className="tab-content">
          <div className="tab-pane fade in active" id="men">
            <ul className="aa-product-catg">
                 <ItemList data={this.props.data}/>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class ItemList extends React.Component {
	constructor(props) {
		super(props);
	}
   render() 
   {
    var itemNodes = this.props.data.map(function(item) {
      return (
        <Item author={item.author} key={item.id}>
        </Item>
      );
    });
    return (
      <div className="itemList">
        {itemNodes}
      </div>
    );
  }
}

class Item extends React.Component {
  rawMarkup() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="item">
              <li>
              <figure>
                <a className="aa-product-img" href="#"><img src="img/man/polo-shirt-2.png" alt="polo shirt img" /></a>
                <a className="aa-add-card-btn"href="#"><span className="fa fa-shopping-cart"></span>Add To Cart</a>
                  <figcaption>
                    <h4 className="aa-product-title"><a href="#">Polo T-Shirt Jon Dellaria testing additioal text</a></h4>
                    <span className="aa-product-price">$45.50</span><span className="aa-product-price"><del>${this.props.author}</del></span>
                  </figcaption>
              </figure>                        
              <div className="aa-product-hvr-content">
                <a href="#" data-toggle="tooltip" data-placement="top" title={this.props.author}><span className="fa fa-heart-o"></span></a>
                <a href="#" data-toggle="tooltip" data-placement="top" title="Compare"><span className="fa fa-exchange"></span></a>
                <a href="#" data-toggle2="tooltip" data-placement="top" title="Quick View" data-toggle="modal" data-target="#quick-view-modal"><span className="fa fa-search"></span></a>                          
              </div>
            <span className="aa-badge aa-sale" href="#">SALE!</span>
              </li>  
      </div>
    );
  }
}

ReactDOM.render(
//  <CommentBox data={data}/>,
  <ItemBox data={data}/>,
//  <ItemBox name="Jon" />,
  document.getElementById('content')
);

