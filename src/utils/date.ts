import { DATE_FORMAT } from "@/constants/common";
import dayjs from "dayjs";

export const formatDate = (value: Date, formatType=DATE_FORMAT) => dayjs(value).format(formatType)


