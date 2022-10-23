const $ = (name) => document.querySelector(name);

const inputName = $("#input-name");
const btnCreate = $("#btn-create");
const tbody = $("#tbody");

const inputNameProduct = $("#input-name-product");
const inputPriceProduct = $("#input-price-product");
const inputUrlImageProduct = $("#input-url_image-product");
const inputDiscountProduct = $("#input-discount-product");
const inputCategoryProduct = $("#input-category-product");
const btnCreateProduct = $("#btn-create-product");
const tbodyproducts = $("#tbody-products");

const data = {};

inputName.onkeyup = function (event) {
  data.name = event.target.value;
};

/* Capturar datos de Inputs de Producto */
inputNameProduct.onkeyup = function (event) {
    data.name = event.target.value;
};
inputPriceProduct.onkeyup = function (event) {
    data.price = Number(event.target.value);
};
inputUrlImageProduct.onkeyup = function (event) {
    data.url_image = event.target.value;
};
inputDiscountProduct.onkeyup = function (event) {
    data.discount = Number(event.target.value);
};
inputCategoryProduct.onkeyup = function (event) {
    data.category = Number(event.target.value);
};

/* */

async function getCategories() {
  try {
    const result = await get("/category");
    result.forEach((category) => renderRow(category));
  } catch (error) {
    console.log(error);
  }
}

async function getProducts() {
    try {
      const result = await get("/product");
      result.forEach((product) => renderRowProduct(product));
    } catch (error) {
      console.log(error);
    }
  }

getCategories();
getProducts();

btnCreate.onclick = async function () {
  try {
    const result = await post("/category", data);
    inputName.value = "";
    renderRow(result);
  } catch (error) {
    console.log(error);
  }
};

btnCreateProduct.onclick = async function () {
    try {
      const result = await post("/product", data);
      inputName.value = "";
      renderRowProduct(result);
    } catch (error) {
      console.log(error);
    }
  };

function renderRow(category) {
  tbody.innerHTML += `
        <tr>
          <td>${category.id}</td>
          <td>${category.name}</td>
        </tr>
      `;
}

function renderRowProduct(product) {
    tbodyproducts.innerHTML += `
          <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src=${product.url_image} width="100px">
            
            </td>
            <td>${product.discount}</td>
            <td>${product.category}</td>
          </tr>
        `;
  }