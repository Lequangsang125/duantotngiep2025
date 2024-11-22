import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useState } from "react";
import Form from "@/components/check/Form";
import { addProductForm } from "@/config";
import Image_Uppload from "@/components/admin-view/Image_Uppload";
const AdminProduct = () => {
  const initFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };
  const [openCreateProduct, setopenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initFormData);
  const [imagefile, setimagefile] = useState(null);
  const [upploadimage, setupploadimage] = useState(null);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setopenCreateProduct(true)}>Add san pham</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg_grid-cols-4"></div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setopenCreateProduct(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>add new products</SheetTitle>
            <Image_Uppload
              imagefile={imagefile}
              setimagefile={setimagefile}
              upploadimage={upploadimage}
              setupploadimage={setupploadimage}
            ></Image_Uppload>
          </SheetHeader>
          <div className="py-6">
            <Form
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControll={addProductForm}
            ></Form>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProduct;
