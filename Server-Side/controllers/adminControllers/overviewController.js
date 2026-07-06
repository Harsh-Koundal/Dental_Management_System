import User from "../../models/User.js";

export const getDashboardOverview = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments({
            role: "USER",
        });

        const today = new Date();

        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );

        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
        );

        const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
        );

        const endOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            1
        );


        const users = await User.find({}, "appointments");

        let todayAppointments = 0;
        let monthAppointments = 0;
        let pendingAppointments = 0;
        let completedAppointments = 0;
        let missedAppointments = 0;


        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const patientsByMonth = monthNames.map((month) => ({
            month,
            patients: 0,
        }));

        users.forEach((user) => {
            user.appointments.forEach((appointment) => {
                const appointmentDate = new Date(appointment.date);

                if (appointmentDate >= startOfDay && appointmentDate < endOfDay) {
                    todayAppointments++;
                }

                if (appointmentDate >= startOfMonth && appointmentDate < endOfMonth) {
                    monthAppointments++;
                }

                if (appointment.status === "UPCOMING") {
                    pendingAppointments++;
                }

                if (appointment.status === "COMPLETED") {
                    completedAppointments++;
                }

                if (appointment.status === "MISSED") {
                    missedAppointments++;
                }

                const monthIndex = appointmentDate.getMonth();

                patientsByMonth[monthIndex].patients += 1;

            });
        });

        const totalAppointments = completedAppointments + pendingAppointments + missedAppointments;

        const appointmentBreakdown = [
            {
                name: "Completed",
                value:
                    totalAppointments > 0
                        ? Math.round(
                            (completedAppointments / totalAppointments) * 100
                        )
                        : 0,
                color: "#3b82f6",
            },
            {
                name: "Pending",
                value:
                    totalAppointments > 0
                        ? Math.round(
                            (pendingAppointments / totalAppointments) * 100
                        )
                        : 0,
                color: "#f59e0b",
            },
            {
                name: "Missed",
                value:
                    totalAppointments > 0
                        ? Math.round(
                            (missedAppointments / totalAppointments) * 100
                        )
                        : 0,
                color: "#ef4444",
            },
        ];

        res.status(200).json({
            sucess:true,
            data:{
                stats:{
                    totalPatients,
                    todayAppointments,
                    monthAppointments,
                    pendingAppointments,
                },
                appointmentBreakdown,
                patientsByMonth,
            },
        });

    }catch(err){
        console.error("error fetching the dashboard Overview data :",err);
        res.status(500).json({
            sucess:false,
            message: "Failed to fetch dashboard Overview",
        });
    }
};