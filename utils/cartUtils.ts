export interface Product {
	section_id: string
	section_name: string
	section_desc: string
	price: number
	course_image: string
	currency: string
  price_data?: {
    product_data: object
  }
}

export const validateCartItems = (inventorySrc: Product[], cartDetails: { [id: string]: any }) => {
  const validatedItems = []

  for (const itemId in cartDetails) {
    const product = cartDetails[itemId]
    const inventoryItem = inventorySrc.find(
      (currentProduct) =>
        currentProduct.section_id === itemId
    )

    if (!inventoryItem) throw new Error(`Product ${itemId} not found!`)

    const item = {
      price_data: {
        currency: inventoryItem.currency,
        unit_amount: inventoryItem.price * 100, // convert price to cents
        product_data: {
          name: inventoryItem.section_name,
          images: ['']
        }
      },
      quantity: product.quantity ? product.quantity : 1
    }
    
    if (inventoryItem.course_image)
      item.price_data.product_data.images = [inventoryItem.course_image]

    validatedItems.push(item)
  }

  return validatedItems
}