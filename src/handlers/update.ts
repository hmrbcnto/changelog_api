import prisma from '../db';

// Get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });

  const updates = products.map(product => product.updates);

  res.json({
    data: updates
  });
}

export const getUpdate = async (req,res) => {
  const updateId = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id: updateId
    }
  });

  res.json({
    data: update
  });
};

export const createUpdate = async (req, res) => {
  // Check if product id belongs to you
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
      id_belongsToId: req.user.id
    }
  });

  if (!product) {
    res.status(400);
    res.json({ 
      message: 'Invalid input'
    });
    return;
  };

  const update = await prisma.update.create({
    data: req.body
  });

  res.json({
    data: update
  });
};

export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.body.productId,
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });

  if (!product) {
    res.status(400);
    res.json({
      data: 'Invalid input'
    });
    return;
  };

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: {
      ...req.body
    }
  });


  res.json({
    data: updatedUpdate
  });
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.body.productId,
      belongsToId: req.user.id
    }
  });

  if (!product) {
    res.status(400);
    res.json({
      message: 'Invalid input'
    });
    return;
  };

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  });

  res.json({
    data: deletedUpdate
  });
}