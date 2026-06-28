async function loadHome() {

  try {

    const res =
      await fetch(
        "/api/home"
      );

    const data =
      await res.json();

    const grid =
      document.getElementById(
        "productGrid"
      );

    grid.innerHTML = "";

    if (
      !data.latest
    ) {
      return;
    }

    data.latest.forEach(
      product => {

        const image =
          (
            product.images &&
            product.images.length
          )
          ?
          product.images[0]
          :
          "/public/images/banner1.jpg";

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "product-card";

        card.innerHTML = `

<img
class="product-image"
src="${image}">

<div
class="product-content">

<div
class="product-title">

${product.title}

</div>

<div
class="product-price">

Rp ${rupiah(product.price)}

</div>

<div
class="product-location">

${product.location || "Indonesia"}

</div>

<div
class="product-meta">

<div
class="product-time">

${new Date(
product.createdAt
).toLocaleDateString("id-ID")}

</div>

<div
class="favorite-btn">

♥

</div>

</div>

</div>

`;

        card.onclick =
          () => {

          window.location.href =
            "/product?id=" +
            product.id;

        };

        grid.appendChild(
          card
        );

      }
    );

  } catch (err) {

    console.log(err);

  }
}

loadHome();
