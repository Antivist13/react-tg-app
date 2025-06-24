import {
    FC,
    useEffect,
    useRef,
    useState,
} from "react";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import IconButton from "@mui/material/IconButton";
import "./Chart.css";
import Select from "../../UI/select/Select";
import { chartOptions, selectOptions } from "./Chart.const";
import { createOptionsChart, LineSeries, IChartApiBase } from 'lightweight-charts';

interface IChart {
    time: number;
    value: number;
}

const Chart: FC = () => {
    const [title, setTitle] = useState<string | null>(null);
    const [select, setSelect] = useState<string | null>(null);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);

    const getChartData = (): IChart[] => {
        const data: IChart[] = [];
        for (let i = 0; i < 1000; i++) {
            data.push({
                time: i * 0.25,
                value: Math.sin(i / 100) + i / 500,
            });
        }
        return data;
    }

    const createChart = (container: HTMLElement): IChartApiBase<number> => {
        return createOptionsChart(container, chartOptions);
    }

    useEffect(() => {
        setTitle('Статистика');
        const container = chartContainerRef.current;
        if (container) {
            const chart = createChart(container);
            const lineSeries = chart.addSeries(LineSeries, { color: '#2992F0' });
            const lineSeries2 = chart.addSeries(LineSeries, { color: '#FF1A43' });
            const data: IChart[] = getChartData();
            const data2: IChart[] = [];
            for (let i = 0; i < 1000; i++) {
                data2.push({
                    time: i * 0.25,
                    value: Math.cos(i / 100) + i / 600,
                });
            }

            lineSeries.setData(data);
            lineSeries2.setData(data2);
            chart.timeScale().fitContent();

            return () => chart.remove();
        }
    }, []);

    return (
        <section className="chart">
            <div className="chartButtons">
                <IconButton aria-label="chart">
                    <AssessmentOutlinedIcon sx={{color: '#2992F0', fontSize: 16}}/>
                </IconButton>
                <span className="chartTitle">{title}</span>
                <>
                    <span className="chartSelect">{'за месяц'}</span>
                    <Select items={selectOptions}/>
                </>
            </div>
            <div ref={chartContainerRef} className="chartContainer"></div>
            <div className="chartIndicators">
                <AdjustOutlinedIcon name='success' sx={{color: '#2992F0', fontSize: 16}} />
                <label htmlFor='success' className="chartLabel">
                    Успешные
                </label>
                <AdjustOutlinedIcon name='unsuccess' sx={{color: '#FF1A43', fontSize: 16}}/>
                <label htmlFor='unsuccess' className="chartLabel">
                    Не оплаченные
                </label>
            </div>
        </section>
    );
}

export default Chart;