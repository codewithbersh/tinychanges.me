// import db from "@/lib/prismadb";
// import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
// import { TRPCError } from "@trpc/server";
// import { startOfToday } from "date-fns";
// import { z } from "zod";

// export const commitmentRouter = router({
//   public: router({
//     byHabitId: publicProcedure
//       .input(
//         z.object({
//           habitId: z.string(),
//         }),
//       )
//       .query(async ({ input }) => {
//         const { habitId } = input;

//         try {
//           return await db.commitment.findMany({
//             where: {
//               habitId,
//             },
//           });
//         } catch (error) {
//           throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
//         }
//       }),
//   }),
//   private: router({
//     mutate: privateProcedure
//       .input(
//         z.object({
//           habitId: z.string(),
//         }),
//       )
//       .mutation(async ({ ctx, input }) => {
//         const date = startOfToday();
//         const { userId } = ctx;
//         const { habitId } = input;

//         try {
//           const update = await db.commitment.findFirst({
//             where: {
//               habit: {
//                 id: habitId,
//                 userId,
//               },
//               date,
//             },
//           });

//           if (update && update.status === "COMPLETED") {
//             await db.commitment.update({
//               where: {
//                 id: update.id,
//               },
//               data: {
//                 status: "SKIPPED",
//               },
//             });
//           } else if (update && update.status === "SKIPPED") {
//             await db.commitment.delete({
//               where: {
//                 id: update.id,
//               },
//             });
//           } else {
//             await db.commitment.create({
//               data: {
//                 date,
//                 habitId,
//               },
//             });
//           }
//         } catch (error) {
//           throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
//         }
//       }),
//     byHabitId: privateProcedure
//       .input(
//         z.object({
//           habitId: z.string(),
//         }),
//       )
//       .query(async ({ ctx, input }) => {
//         const { userId } = ctx;
//         const { habitId } = input;

//         try {
//           return await db.commitment.findMany({
//             where: {
//               habitId,
//               habit: {
//                 user: {
//                   id: userId,
//                 },
//               },
//             },
//           });
//         } catch (error) {
//           throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
//         }
//       }),
//     mutateByDate: privateProcedure
//       .input(
//         z.object({
//           date: z.date(),
//           habitId: z.string(),
//         }),
//       )
//       .mutation(async ({ ctx, input }) => {
//         const { userId } = ctx;
//         const { habitId, date } = input;

//         try {
//           const update = await db.commitment.findFirst({
//             where: {
//               habitId,
//               date,
//             },
//           });

//           if (update && update.status === "COMPLETED") {
//             await db.commitment.update({
//               where: {
//                 id: update.id,
//               },
//               data: {
//                 status: "SKIPPED",
//               },
//             });
//           } else if (update && update.status === "SKIPPED") {
//             await db.commitment.delete({
//               where: {
//                 id: update.id,
//               },
//             });
//           } else {
//             await db.commitment.create({
//               data: {
//                 date,
//                 habitId,
//               },
//             });
//           }
//         } catch (error) {
//           throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
//         }
//       }),
//   }),
// });
