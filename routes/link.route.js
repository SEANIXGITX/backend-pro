import { Router } from "express";
import { createLink, getLink, getLinkCRUD, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { ValidationCreateLink, ValidationParamLink } from "../middlewares/validatorManager.js";
const router = Router()

// GET      /api/v1/links/       all links
// GET      /api/v1/links/:id    single link
// POST     /api/v1/links/       create link
// PATCH    /api/v1/links/:id    update link
// DELETE   /api/v1/links/:id    remove link

router.get("/", requireToken, getLinks)
router.get("/:nanoLink", getLink)
// router.get("/:id", requireToken, getLinkCRUD)
router.post("/", requireToken, ValidationCreateLink, createLink)
router.patch("/:id", requireToken, ValidationParamLink, updateLink) // PATCH solo actualiza un campo PUT actualizaz varios campos
router.delete("/:id", requireToken, ValidationParamLink, ValidationCreateLink, removeLink)

export default router