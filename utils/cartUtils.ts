export interface Product {
	section_id: number
	section_name: string
	section_desc: string
	price: number
	course_image: string
	currency: string
}

export const validateCartItems = (inventorySrc, cartDetails) => {
  const validatedItems = []

  for (const itemId in cartDetails) {
    const product = cartDetails[itemId]
    const inventoryItem = inventorySrc.find(
      (currentProduct) =>
        currentProduct.section_id === itemId || currentProduct.section_id === itemId
    )

    if (!inventoryItem) throw new Error(`Product ${itemId} not found!`)

    const item = {
      price_data: {
        currency: inventoryItem.currency,
        unit_amount: inventoryItem.price * 100, // convert price to cents
        product_data: {
          name: inventoryItem.section_name
        }
      },
      quantity: product.quantity ? product.quantity : 1
    }
    if (inventoryItem.description)
      item.price_data.product_data.description = inventoryItem.description
    if (inventoryItem.image)
      item.price_data.product_data.images = [inventoryItem.image]
    if (inventoryItem.price_data)
      item.price_data = {
        ...item.price_data,
        ...inventoryItem.price_data
      }
    if (inventoryItem.product_data)
      item.price_data.product_data = {
        ...item.price_data.product_data,
        ...inventoryItem.product_data
      }
    validatedItems.push(item)
  }

  return validatedItems
}

export const formatLineItems = (cartDetails) => {
  const lineItems = []

  for (const itemId in cartDetails) {
    if (cartDetails[itemId].sku_id || cartDetails[itemId].price_id)
      lineItems.push({ price: itemId, quantity: cartDetails[itemId].quantity })
  }

  return lineItems
}