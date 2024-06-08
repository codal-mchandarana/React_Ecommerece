import OrderItem from "./OrderItem";

const OrderDetailsItem: React.FC<{ carts: any }> = ({ carts }): JSX.Element => {
  console.log(carts);
  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container ">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div
                style={{
                  boxShadow:
                    "0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)",
                }}
                className="card mb-4"
              >
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card-header py-3">
                  <h5 className="mb-0">
                    OrderDetails - {carts.length}{" "}
                    {carts.length === 1 ? "item" : "items"}
                  </h5>
                  <h6>Order Date :- {(carts[0]?.date).split(" ")[0]} , {(carts[0]?.date).split(" ")[1]}</h6>
                </div>

                <div className="card-body">
                  {/* Single item */}
                  <div className="container">
                    <div className="row mt-2 gx-5">
                      {carts.map((item: any) => {
                        return (
                          <>
                            <OrderItem
                              key={Math.ceil(Math.random() * 10000)}
                              data={item}
                            />
                            <hr className="my-4" />
                          </>
                        );
                      })}
                      <div className="row">
                        <div style={{marginLeft:"3rem"}} className="flex flex-direction: column col-lg-5 col-md-5 mb-4 mb-lg-0 ">
                          <h5 style={{color:"red"}}><strong>Total Bill :- {carts[0]?.amount}</strong></h5>
                        </div> 
                      </div>
                    </div>
                  </div>
                  {/* Single item */}
                </div>
              </div>
              {/* <CartFooter /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default OrderDetailsItem;
