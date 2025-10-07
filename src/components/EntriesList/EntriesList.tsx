import { updateEntryStatus } from "@/api/entry";
import type { Entry } from "@/api/entry/types";
import { userIsAdmin } from "@/api/user";
import { getCurrentUser } from "@/utils/auth";
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../ui/Loader/Loader";

interface EntriesListProps {
    entries: Entry[];
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
    userID?: number;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
    "not processed": { bg: "#FFF3E0", text: "#FB8C00" },
    "processed": { bg: "#FFF3E0", text: "#43A047" },
    "rejected": { bg: "#FFF3E0", text: "#E53935" },
};

const texts: Record<string, string> = {
    "not processed": "Не обработана",
    "processed": "Обработана",
    "rejected": "Отклонена",
}

const EntriesList: React.FC<EntriesListProps> = ({ entries, setEntries, userID }) => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        if (userID === null || userID === undefined) {
            setIsAdmin(false);
            return;
        }

        userIsAdmin(userID)
            .then((res) => setIsAdmin(res.is_admin))
            .catch(() => setIsAdmin(false));
    }, [userID]);

    if (isAdmin === null) return <Loader />;

    if (!entries || entries.length === 0) {
        return <Typography align="center" sx={{ mt: 2 }}>Заявок пока нет</Typography>;
    }


    const handleStatusChange = async (id: number, status: string) => {
        const userToken = getCurrentUser()?.token;
        if (!userToken) return;

        // Обновляем локально сразу (оптимистично)
        setEntries((entries) =>
            entries.map((entry) =>
                entry.ID === id ? { ...entry, Status: status } : entry
            )
        );

        try {
            const res = await updateEntryStatus({ id, status }, userToken);

            // Нормализуем объект API под Entry
            setEntries((entries) =>
                entries.map((entry) =>
                    entry.ID === id
                        ? {
                            ...entry,
                            Course: res.Course ?? entry.Course,
                            Date: res.Date ?? entry.Date,
                            PaymentMethod: res.PaymentMethod ?? entry.PaymentMethod,
                            Status: res.Status ?? entry.Status,
                        }
                        : entry
                )
            );
        } catch (err) {
            console.log(err);
            // Можно откатить локальный статус, если нужно
        }
    };


    return (
        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
            {entries.map((entry) => {
                const status = statusStyles[entry.Status] || { bg: "#E0E0E0", text: "#424242" };

                return (
                    <Card
                        key={entry.ID}
                        sx={{
                            minWidth: 250,
                            maxWidth: 320,
                            borderRadius: 2,
                            boxShadow: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Курс
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {entry.Course}
                            </Typography>

                            <Typography variant="subtitle2" color="text.secondary">
                                Дата
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {new Date(entry.Date).toLocaleDateString()}
                            </Typography>

                            <Typography variant="subtitle2" color="text.secondary">
                                Метод оплаты
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {entry.PaymentMethod === "card" ? "Карта" : "Наличные"}
                            </Typography>

                            <Chip
                                label={texts[entry.Status]}
                                sx={{
                                    mt: 2,
                                    backgroundColor: status.bg,
                                    color: status.text,
                                    fontWeight: 600,
                                    borderRadius: 1,
                                    height: 40,
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 14,
                                }}
                            />
                        </CardContent>

                        {isAdmin && (
                            <CardActions sx={{ justifyContent: "center", gap: 1, width: '100%', pb: 2 }}>
                                <Button size="small" variant="contained" color="primary" onClick={() => {
                                    handleStatusChange(entry.ID, "processed")
                                }}>
                                    Обработать
                                </Button>
                                <Button size="small" variant="contained" color="error" onClick={() => {
                                    handleStatusChange(entry.ID, "rejected")
                                }}>
                                    Отклонить
                                </Button>
                            </CardActions>
                        )}
                    </Card>
                );
            })}
        </Box>
    );
};

export default EntriesList;
