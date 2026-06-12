import React from "react";


const ComparisonTable = ({ recommendations }) => {

  if (!recommendations?.length)
    return null;

  return (

    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Recommended Cars
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {recommendations.map(
          (car, index) => (

            <div
              key={index}
              className="
                        bg-white
                        rounded-xl
                        shadow-md
                        p-5
                        border
                        "
            >

              <h3
                className="
                            text-xl
                            font-bold
                            mb-3
                            "
              >
                {car.name}
              </h3>

              <p
                className="
                            text-gray-600
                            mb-4
                            "
              >
                {car.reason}
              </p>

              <div
                className="
                            bg-gray-100
                            p-2
                            rounded
                            "
              >
                <strong>
                  Price:
                </strong>

                <br />

                {
                  car.approx_price_range
                }
              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

export default ComparisonTable