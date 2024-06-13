import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const poemRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({ name: z.string().min(1), content: z.string(), tags: z.array(z.string()) }))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.poem.create({
				data: {
					name: input.name,
					content: input.content,
					tags: input.tags, 
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getAllByUser: publicProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db.poem.findMany({
				where: {
					createdById: input.userId,
				},
			});
		}),
	getPostById: publicProcedure
		.input(z.object({ postId: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db.poem.findFirst({
				where: {
					id: input.postId,
				},
			});
		}),
	updatePost: protectedProcedure
		.input(z.object({ postId: z.string(), content: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.poem.update({
				where: {
					id: input.postId,
					createdById: ctx.session.user.id,
				},
				data: {
					content: input.content,
				},
			});
		}),
	deletePostById: protectedProcedure
		.input(z.object({ postId: z.string()}))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.poem.delete({ 
				where: {
					id: input.postId
				}
			})
		})
});
