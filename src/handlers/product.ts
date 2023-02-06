import prisma from '../db';

export const getProducts = async (req, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      products: true
    }
  });
  
  res.status(200);
  res.json({ data: user.products });
};

export const getProduct = async (req, res) => {
  // Check if user owns product
  const productId = req.params.id;
  const userId = req.user.id;

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsToId: userId
    }
  });

  res.json({
    data: product
  });
};

export const createProduct = async (req,res) => {
  const productData = req.body.product;
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id
    }
  });

  res.json({
    data: product
  });
};

export const updateProduct = async (req,res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
      id_belongsToId: userId
    },
    data: {
      name: req.body.name
    }
  });

  res.json({
    data: updatedProduct
  });
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const deletedProduct = await prisma.product.delete({
    where: {
      id: productId,
      id_belongsToId: userId
    }
  });

  res.json({
    data: deletedProduct
  });
};

