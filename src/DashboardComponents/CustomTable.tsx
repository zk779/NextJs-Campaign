// customTable.tsx
import { FC } from "react";
import Link from 'next/link';  // Import Link component from Next.js
import { PlayCircle, PauseCircle, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Hourglass, Undo2, ThumbsUp, Mail } from "lucide-react";

interface CampaignData {
  id: number;
  active: boolean;
  title: string;
  campaign_timezone: string;
  triggered_by: string;
  days: string[];
  start_at: string;
  per_day_limit: number;
  maximum_limit: number;
  contact_pointer: number;
  template_pointer: number;
  followup_template_pointer: number;
  waiting_time: number;
  primary_reply_to: string;
  executing: boolean;
  last_execution_date: string;
}

interface campaignParams {
  campaignsComponentData: CampaignData[];
}

const CustomTable: FC<campaignParams> = ({ campaignsComponentData }) => {
  return (
    <Table className="">
      <TableHeader className="">
        <TableRow>
          <TableHead className="w-[100px] text-left">Name</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Created</TableHead>
          <TableHead className="text-center">Performance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaignsComponentData.map((item) => (
          <TableRow key={item.id} className="border-t border-b border-gray-100 cursor-pointer">
            <TableCell className="font-medium whitespace-nowrap">
              <div className="">
                {/* Wrap the title with a Link */}
                  <span className="link-style capitalize font-bold text-lg">{item.title}</span>
                {item.primary_reply_to !== null && (
                  <p className="text-slate-400 mt-1">{item.primary_reply_to}</p>
                )}
              </div>
            </TableCell>
            <TableCell>
              {item.active ? (
                <span className="text-green-500 font-semibold uppercase flex gap-1 items-center justify-center">
                  <PlayCircle />
                  <span>Active</span>
                </span>
              ) : (
                <span className="text-red-500 font-semibold uppercase flex gap-1 items-center justify-center">
                  <PauseCircle />
                  <span>Paused</span>
                </span>
              )}
            </TableCell>
            <TableCell className="text-center">
              {"About 4 hours ago"}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex gap-3 justify-center">
                <div className="flex items-center gap-1">
                  <Hourglass className="h-4 w-4" />
                  <span className="text-lg font-semibold">1</span>
                </div>

                <div className="flex items-center gap-1 text-iconcolor1">
                  <Mail className="h-4 w-4" />
                  <span className="text-lg font-semibold">0</span>
                </div>

                <div className="flex items-center gap-1 text-iconcolor2">
                  <Undo2 className="h-4 w-4" />
                  <span className="text-lg font-semibold">0%</span>
                </div>

                <div className="flex items-center gap-1 text-iconcolor3">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-lg font-semibold">0%</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
            <Link href={`/campaign/edit/${item.id}`}>
                <ChevronRight color="#738eac"/>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
