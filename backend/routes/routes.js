const { Router } = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const { requireAuth }  = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout);
router.post('/posts/upload', requireAuth, postController.create_post);
router.get('/posts/like/:id', requireAuth, postController.like_post);
router.put('/posts/update/:id', requireAuth, postController.update_post);
router.delete('/posts/delete/:id', requireAuth, postController.delete_post);

module.exports = router;