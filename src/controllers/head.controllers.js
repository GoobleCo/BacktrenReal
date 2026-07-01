import * as headService from "../services/head.services.js";

export const getAll = async (req, res) => {
	try {
		const heads = await headService.getAllHeads();
		res.json(heads);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getById = async (req, res) => {
	try {
		const { id } = req.params;
		const head = await headService.getHeadById(id);
		if (!head) return res.status(404).json({ message: "Head not found" });
		res.json(head);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const create = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) return res.status(400).json({ message: "'name' is required" });
		const created = await headService.createHead({ name, description });
		res.status(201).json(created);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const update = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;
		const updated = await headService.updateHead(id, { name, description });
		if (!updated) return res.status(404).json({ message: "Head not found" });
		res.json(updated);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const remove = async (req, res) => {
	try {
		const { id } = req.params;
		const head = await headService.getHeadById(id);
		if (!head) return res.status(404).json({ message: "Head not found" });
		await headService.deleteHead(id);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
