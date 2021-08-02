import React from "react";
import Link from "next/link";
import displayShopifyCollection from "../src/shopifyStore";
import styles from "styles/Home.module.scss";

const ShopifyMiniCollection = () => {
  return (
    <div>
      <h2>Check out our merch collection</h2>
      <p>
        Normalize <b>#buyingblack</b>, but make it fashionable
      </p>
      {/* <hr></hr> */}
      <div id="collection-component-1622397719540">
        {displayShopifyCollection(
          "collection-component-1622397719540",
          "266521968830"
        )}
      </div>
      <Link href="/merch">
        <a className={styles.shop_more}>
          <button>Shop More</button>
        </a>
      </Link>
    </div>
  );
};

export default ShopifyMiniCollection;
