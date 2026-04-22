import type { Request, Response } from "express";

export const mockSend = jest.fn();
export const mockStatus = jest.fn();
export const mockRes = {
	status: mockStatus,
	send: mockSend,
} as unknown as Response;
export const mockAuthentifiedReq = {
	user: { id: "user-id" },
} as unknown as Request;
export const mockUnauthentifiedReq = {} as unknown as Request;
