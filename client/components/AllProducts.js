import React from "React"

class AllProducts extends React.Component {
  componentDidMount(){
    this.props.getProducts()
  }

  render(){
    return (
      <div>
        {this.props.products.map(product => {
        return (
          <ul>
            <li>
              <img src = {product.imgPath}/>
              {product.name}
              <button> Add to Cart</button>
            </li>
          </ul>
        )
      })}
      </div>
    )
  }
}

const mapState = function(state){
  return {
    products: state.products
  }
}

const mapDispatch = function(dispatch){
  return {
    getProducts: function(){
      const action = getProducts()
      dispatch(action)
    }
  }
}

const componentCreator = connect(mapState, mapDispatch)
const AllProductsContainer = componentCreator(AllProducts)
export default AllProductsContainer
