import Settings from '../models/settings.model.js';

export const getSettings = async (req, res, next) => {
  try {
   const settings = await Settings.findOne() || {};
    res.json(settings ? settings.toObject() : {});
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await Settings.findOne() || new Settings({});

    settings.set({
      ...req.body,
      socialMediaLinks: {
        facebook: req.body.facebookUrl,
        instagram: req.body.instagramUrl,
        twitter: req.body.twitterUrl
      },
      businessInfo: {
        address: req.body.businessAddress,
        phone: req.body.businessPhone,
        businessHours: req.body.businessHours
      }
    });

    await settings.save();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};
